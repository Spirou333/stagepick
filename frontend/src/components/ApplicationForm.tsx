import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { createApplication } from "../api/applicationsApi";
import { GenrePicker } from "./GenrePicker";

const genreSchema = z.object({
  id: z.string(),
  name: z.string(),
  main: z.boolean()
});

const eventTypeOptions = [
  { value: "convention", label: "Convention" },
  { value: "festival", label: "Festival" },
  { value: "club", label: "Club" },
  { value: "vrchat", label: "VRChat" },
  { value: "private", label: "Private" },
  { value: "other", label: "Other" }
] as const;

const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  date: z.string().min(1, "Event date is required"),
  live: z.boolean(),
  type: z.enum(["convention", "festival", "club", "vrchat", "private", "other"], {
    message: "Please select an event type",
  })
});

const applicationSchema = z.object({
  stageName: z.string().min(1, "Stagename is required for the lineup"),
  email: z.email("Enter a valid email address").min(1, "E-Mail is required to be able to contact you"),
  telegram: z.string(),
  regID: z.number(),
  motivation: z
    .string()
    .min(20, "Please write at least 20 characters")
    .max(1000, "Please keep your answer under 1000 characters"),
  events: z
    .array(eventSchema)
    .min(1, "Please add at least one event")
    .max(10, "You can add up to 10 events"),
  genres: z
    .array(genreSchema)
    .min(1, "You need to select at least one genre")
    .max(10, "You can add a maximum of 10 other genres")
}).superRefine((data, context) => {
    const hasMainGenre = data.genres.some(
      (item) => item.main
    );

    if (!hasMainGenre) {
      context.addIssue({
        code: "custom",
        path: ["genres"],
        message: "At least one main genre must be selected.",
      });
    }
  });

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function ApplicationForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      stageName: "",
      email: "",
      telegram: "",
      regID: 0,
      motivation: "",
      genres: [],
      events: [
        {
          name: "",
          date: "",
          type: "convention",
          live: false
        }
      ]
    }
  });

  const selectedGenres = watch("genres");

  const {
    fields: eventFields,
    append: appendEvent,
    remove: removeEvent,
  } = useFieldArray({
    control,
    name: "events"
  });

  async function onSubmit(data: ApplicationFormData) {
    try {
      const result = await createApplication(data);
      console.log("Application created:", result);
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  }

  return (
    <form className="card shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body px-4">
        <div className="row g-4">
          <div className="col-12">
            <h4 className="mt-4 mb-1">General Information</h4>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="stageName" className="form-label">
              Stage Name <span className="text-danger">*</span>
            </label>
            <input
              id="stageName"
              type="text"
              placeholder="DJ Fresh"
              aria-describedby="stageNameHelpBlock"
              className={`form-control ${errors.stageName ? "is-invalid" : ""}`}
              {...register("stageName")}
            />
            <div id="stageNameHelpBlock" className="form-text">
              The name that will be shown on the linup.
            </div>
            {errors.stageName && (
              <div className="invalid-feedback">
                {errors.stageName.message}
              </div>
            )}
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="email" className="form-label">
              E-Mail Address <span className="text-danger">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="mail@domain.tld"
              aria-describedby="emailHelpBlock"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
            />
            <div id="emailHelpBlock" className="form-text">
              Notifications from Stagepick will be send to this E-Mail.
            </div>
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="telegram" className="form-label">
              Telegram
            </label>
            <div className="input-group">
              <div className="input-group-text">@</div>
              <input
                id="telegram"
                type="text"
                placeholder="username"
                aria-describedby="telegramHelpBlock"
                className={`form-control ${errors.telegram ? "is-invalid" : ""}`}
                {...register("telegram")}
              />
            </div>
            <div id="telegramHelpBlock" className="form-text">
              Telegram is the easiest way for us to contact you directly in case there is any questions or issues. Otherwise we contact you over E-Mail or Stagepick.
            </div>
            {errors.telegram && (
              <div className="invalid-feedback">{errors.telegram.message}</div>
            )}
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="regID" className="form-label">
              Registration Number
            </label>
            <input
              id="regID"
              type="number"
              placeholder="1234"
              aria-describedby="regIDHelpBlock"
              className={`form-control ${errors.regID ? "is-invalid" : ""}`}
              {...register("regID")}
            />
            <div id="regIDHelpBlock" className="form-text">
              If you already have a registration, please add it. Otherwise leave this blank.
            </div>
            {errors.regID && (
              <div className="invalid-feedback">{errors.regID.message}</div>
            )}
          </div>
          <div className="col-12">
            <h4 className="mt-4 mb-1">DJ Specifications</h4>
            
          </div>
          <div className="col-12">
            <h5>References <span className="text-danger">*</span></h5>
            <p className="text-muted small mb-0">
              Add up to 10 events as references for your application.
            </p>
            <button 
              type="button"
              disabled={eventFields.length >= 10}
              onClick={() =>
                appendEvent({
                  name: "",
                  date: "",
                  live: true,
                  type: "convention"
                })
              }
              className="btn btn-primary d-block my-2 fw-bold"
            >+</button>
            <div className="vstack gap-3">
            {eventFields.map((eventField, index) => (
              <div className="border rounded p-3 bg-light" key={eventField.id}>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label htmlFor={`events.${index}.name`} className="form-label">
                      Event name
                    </label>
                    <input
                      id={`events.${index}.name`}
                      type="text"
                      className={`form-control ${
                        errors.events?.[index]?.name ? "is-invalid" : ""
                      }`}
                      {...register(`events.${index}.name`)}
                    />
                    {errors.events?.[index]?.name && (
                      <div className="invalid-feedback">
                        {errors.events[index]?.name?.message}
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor={`events.${index}.date`} className="form-label">
                      Event date
                    </label>
                    <input
                      id={`events.${index}.date`}
                      type="date"
                      className={`form-control ${
                        errors.events?.[index]?.date ? "is-invalid" : ""
                      }`}
                      {...register(`events.${index}.date`)}
                    />
                    {errors.events?.[index]?.date && (
                      <div className="invalid-feedback">
                        {errors.events[index]?.date?.message}
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor={`events.${index}.type`} className="form-label">
                      Type
                    </label>
                    <select
                      id={`events.${index}.type`}
                      className={`form-select ${
                        errors.events?.[index]?.type ? "is-invalid" : ""
                      }`}
                      {...register(`events.${index}.type`)}
                    >
                      {eventTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.events?.[index]?.type && (
                      <div className="invalid-feedback">
                        {errors.events[index]?.type?.message}
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-1 d-flex flex-column align-items-center">
                    <label htmlFor={`events.${index}.type`} className="form-label">
                      Live?
                    </label>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input mt-2" 
                        type="checkbox" 
                        role="switch" 
                        id={`events.${index}.live`} 
                        switch></input>
                    </div>
                  </div>
                  <div className="col-12 col-md-1 d-flex flex-column align-items-center justify-content-center">
                  {eventFields.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={() => removeEvent(index)}
                    >
                      X
                    </button>
                  )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          <div className="col-12">
            <GenrePicker
              selectedGenres={selectedGenres}
              onChange={(items) => {
                setValue("genres", items, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
            {errors.genres && (
              <div className="text-danger small mt-1">
                {errors.genres.message}
              </div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="motivation" className="form-label">
              Why do you want to apply?
            </label>
            <textarea
              id="motivation"
              rows={3}
              className={`form-control ${
                errors.motivation ? "is-invalid" : ""
              }`}
              {...register("motivation")}
            />
            {errors.motivation && (
              <div className="invalid-feedback">
                {errors.motivation.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="card-footer bg-white d-flex justify-content-end border-top-0">
        <button className="btn btn-grey me-2">Cancel</button>
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit application"}
        </button>
      </div>
    </form>
  );
}