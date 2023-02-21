import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { formatAsPhone } from "../../utils/formatAsPhone";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
// import styles from "./index.module.scss";

const styles = {
  fields: "CDLForm_field",
  fieldWrapper: "CDLForm_fieldWrapper",
  body: "CDLForm_body",
  error: "CDLForm_error",
  errorMessage: "CDLForm_errorMessage",
  alertsWrammer: "CDLForm_alertsWrammer",
  button: "CDLForm_button",
};

type stepProps = {
  firstName: string;
  setFirstName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  alertType: string;
  setAlertType: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  errors: {
    firstName: string;
    phone: string;
    email: string;
    alertType: string;
  };
  sendCDLLead: () => void;
};

export default function FinishStep({
  firstName,
  setFirstName,
  phone,
  setPhone,
  alertType,
  setAlertType,
  email,
  setEmail,
  errors,
  sendCDLLead,
}: stepProps) {
  const [t] = useTranslation("common");

  const onPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(formatAsPhone(value.toString(), phone));
  };

  const onEmailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value.toString());
  };

  const onFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFirstName(value.toString());
  };

  return (
    <div className={styles.body}>
      <div className={clsx(styles.fields, "row")}>
        <div className="col-6 col-md-3">
          <div
            className={clsx(
              styles.fieldWrapper,
              errors.firstName ? styles.error : ""
            )}
          >
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={onFirstName}
            />
          </div>
          <span className={styles.errorMessage}>{errors.firstName}</span>
        </div>
        <div className="col-6 col-md-3">
          <div
            className={clsx(
              styles.fieldWrapper,
              errors.phone ? styles.error : ""
            )}
          >
            <input
              type="text"
              value={phone}
              placeholder="Phone Number"
              onChange={onPhoneNumber}
            />
          </div>
          <span className={styles.errorMessage}>{errors.phone}</span>
        </div>
        <div className="col-6 col-md-6">
          <div
            className={clsx(
              styles.fieldWrapper,
              errors.email ? styles.error : ""
            )}
          >
            <input
              type="text"
              value={email}
              placeholder="Email Address"
              onChange={onEmailAddress}
            />
          </div>
          <span className={styles.errorMessage}>{errors.email}</span>
        </div>
      </div>
      <div className="row">
        <ToggleButtonGroup
          onChange={(e) => setAlertType(e)}
          className={clsx(styles.alertsWrammer, "col-12", "")}
          type="radio"
          name="options"
          value={alertType}
        >
          <ToggleButton
            value="DAILY"
            className={`col-md-4 offset-md-2 justify-content-end radioButton`}
          >
            {t("dailyAlerts")}
          </ToggleButton>
          <ToggleButton value="WEEKLY" className="col-md-4 radioButton">
            {t("weeklyAlerts")}
          </ToggleButton>
        </ToggleButtonGroup>
        <span className={styles.errorMessage}>{errors.alertType}</span>
      </div>
      <div className="row">
        <div className="col-12">
          <button className={styles.button} onClick={sendCDLLead}>
            {t("createJobAlert")}
          </button>
        </div>
      </div>
    </div>
  );
}
