import { ApplicationForm } from "../components/ApplicationForm";

export function ApplicationPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="mb-4 text-center">
          <h1 className="h2 fw-bold">Apply to Stagepick</h1>
          <p className="text-muted mb-0">
            Complete the form below to submit your application.
          </p>
        </div>

        <ApplicationForm />
      </div>
    </div>
  );
}