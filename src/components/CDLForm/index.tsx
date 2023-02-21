import React, { useMemo, useState, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
import Select from "react-select";

import {
  createCDLLead,
  defaultAddress,
  AddressDto,
  UTMDto,
} from "../../services/CDLLead.services";

import FinishStep from "./finishStep";
import SuccessfulSending from "./SuccessfulSending";
import { phoneToServerPhone } from "../../utils/formatAsPhone";
import { phoneRegExp } from "../../constants/phone";

type OptionType = {
  value: string;
  label: string;
};
const styles = {
  body: "selection-wrapper",
  properties: "CDLForm_properties",
  property: "CDLForm_property",
  fields: "CDLForm_field",
  city: "CDLForm_city",
  fieldWrapper: "CDLForm_fieldWrapper",
  error: "CDLForm_error",
  errorMessage: "CDLForm_errorMessage",
  button: "CDLForm_button",
  wrapper: "cdl-wrapper",
  title: "CDLForm_title",
  subtitle: "CDLForm_subtitle",
};
export default function CDLForm() {
  const [t] = useTranslation("common");
  const radii = () => {
    const radiiArray = Array.from({ length: 9 }, (_, i) => (i + 1) * 10);
    return radiiArray.map((rad) => ({ value: `${rad}`, label: `+ ${rad} mi` }));
  };

  const CDLproperties = [
    t("CDLproperties.oneClick"),
    t("CDLproperties.updates"),
    t("CDLproperties.alerts"),
  ];

  const CDLLicense: OptionType[] = [
    { value: "driverLicenseClassA", label: "CDL A" },
    { value: "driverLicenseClassB", label: "CDL B" },
    { value: "driverLicenseClassC", label: "CDL C" },
  ];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [addressData, setAddressData] = useState<AddressDto>(defaultAddress);
  const [radius, setRadius] = useState<OptionType | null>();
  const [license, setLicense] = useState<OptionType | null>();
  const [alertType, setAlertType] = useState<string>("DAILY");
  const [firstName, setFirstName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [errors, setErros] = useState({
    fullAddress: "",
    radius: "",
    license: "",
    firstName: "",
    phone: "",
    email: "",
    alertType: "",
  });

  const validateFiled = (field: string, value: string | number | undefined) => {
    !value
      ? setErros((err) => ({ ...err, [field]: t("requiredField") }))
      : setErros((err) => ({ ...err, [field]: "" }));
  };

  const changeStep = (step: number) => {
    setCurrentStep(step);
  };

  const checkStep = () => {
    validateFiled("fullAddress", addressData?.fullAddress);
    validateFiled("radius", radius?.value);
    validateFiled("license", license?.value);

    if (!addressData?.fullAddress || !radius?.value || !license?.value) return;
    changeStep(2);
  };

  const onCoordinatesFound = (
    city: string,
    latLng: google.maps.LatLngLiteral,
    allInfo: AddressDto
  ) => {
    setAddressData(allInfo);
  };

  const sendCDLLead = async () => {
    validateFiled("firstName", firstName);
    validateFiled("phone", phone);
    validateFiled("email", email);

    if (!firstName || !phone || !email) return;

    const checkPhone = phoneRegExp.test(`${phone}`);
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const checkEmail = emailPattern.test(`${email}`);

    !checkPhone
      ? setErros((err) => ({ ...err, phone: t("PhoneNotValid") }))
      : setErros((err) => ({ ...err, phone: "" }));
    !checkEmail
      ? setErros((err) => ({ ...err, email: t("EmailNotValid") }))
      : setErros((err) => ({ ...err, email: "" }));

    if (!checkPhone || !checkEmail) return;

    try {
      await createCDLLead({
        firstName: firstName,
        phone: phoneToServerPhone(phone),
        email: email,
        alertType: alertType,
        driverClass: `${license?.value}`,
        jobsSearchRadiusInMiles: `${radius?.value}`,
        personalInfoAddress: addressData,
      });
    } catch (e) {
      console.error(e);
    } finally {
      changeStep(0);
    }
  };

  // I can't move the component due to an issue: https://github.com/wellyshen/use-places-autocomplete/issues/540
  const FirstStep = () => {
    return (
      <div className={styles.body}>
        <div className={styles.properties}>
          {CDLproperties.map((item, index) => (
            <div key={index} className={styles.property}>
              <i className="fa-solid fa-check"></i>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className={styles.fields}>
          <div className={`col-12 col-md-4 pl-2`}>
            <div
              className={clsx(
                styles.city,
                styles.fieldWrapper,
                errors.fullAddress ? styles.error : ""
              )}
            >
              <AutoCompleteInput
                onCoordinatesFound={onCoordinatesFound}
                placeholder="City"
                allowQuery={false}
                value={addressData?.fullAddress}
              />
            </div>
            <span className={styles.errorMessage}>{errors.fullAddress}</span>
          </div>

          <div className="col-6 col-md-4">
            <div
              className={clsx(
                styles.fieldWrapper,
                errors.radius ? styles.error : ""
              )}
            >
              <Select
                value={radius}
                onChange={(rad) => setRadius(rad)}
                options={radii()}
                isSearchable={false}
                placeholder="Radius"
                classNamePrefix="customSelect"
                required={true}
              />
            </div>
            <div className={styles.errorMessage}>{errors.radius}</div>
          </div>
          <div className="col-6 col-md-4">
            <div
              className={clsx(
                styles.fieldWrapper,
                errors.license ? styles.error : ""
              )}
            >
              <Select
                value={license}
                onChange={(item) => setLicense(item)}
                options={CDLLicense}
                isSearchable={false}
                placeholder="License"
                classNamePrefix="customSelect"
                required={true}
              />
            </div>
            <div className={styles.errorMessage}>{errors.license}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button className={styles.button} onClick={checkStep}>
              {t("createJobAlert")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-9 col-xl-8 mx-auto">
          <div className={styles.wrapper}>
            {currentStep == 0 ? (
              <SuccessfulSending firstName={firstName} />
            ) : (
              <>
                <h2 className={styles.title}>{t("findBetterCDL")}</h2>
                <p className={styles.subtitle}>{t("setupFreeCDL")}</p>
                {currentStep == 1 ? (
                  <FirstStep />
                ) : (
                  <FinishStep
                    firstName={firstName}
                    setFirstName={setFirstName}
                    phone={phone}
                    setPhone={setPhone}
                    alertType={alertType}
                    setAlertType={setAlertType}
                    email={email}
                    setEmail={setEmail}
                    errors={errors}
                    sendCDLLead={sendCDLLead}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
