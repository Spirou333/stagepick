import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createApplication } from "../api/applicationsApi";

const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  motivation: z
    .string()
    .min(20, "Please write at least 20 characters")
    .max(1000, "Please keep your answer under 1000 characters"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function ApplicationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
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
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <div className="invalid-feedback">
                {errors.firstName.message}
              </div>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="phone" className="form-label">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              {...register("phone")}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone.message}</div>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="motivation" className="form-label">
              Why do you want to apply?
            </label>
            <textarea
              id="motivation"
              rows={6}
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

      <div className="card-footer bg-white d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit application"}
        </button>
      </div>
    </form>
  );
}