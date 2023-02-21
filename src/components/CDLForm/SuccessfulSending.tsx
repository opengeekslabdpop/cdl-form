import { useTranslation } from "react-i18next";
// import styles from "./index.module.scss";

const styles = {
  successfulIcon: "CDLForm_successfulIcon",
  successfulText: "CDLForm_successfulText",
  body: "CDLForm_body",
  title: "CDLForm_title",
};

const SuccessfulSending = ({ firstName }: { firstName: string }) => {
  const [t] = useTranslation("common");
  return (
    <div className={styles.body}>
      <div className={styles.successfulIcon}>
        <img
          src="https://cdn.jsdelivr.net/gh/opengeekslabdpop/cdl-form/static/images/check-successful.svg"
          alt="check-successful"
          width={81}
          height={81}
        />
      </div>
      <div className={styles.successfulText}>
        <h2 className={styles.title}>
          {t("thanksSigningUp")}, {firstName}.
        </h2>
      </div>
    </div>
  );
};

export default SuccessfulSending;
