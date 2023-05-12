import { useState } from "react";
import { IntlProvider } from "react-intl";

const messages = {
  "en-US": {
    app_name: "Dietary profile editor",
  },
  "sk": {
    app_name: "Dietárny editor profilu",
  },
};

function I18n({ render }) {
  const [locale, setLocale] = useState("en-US");

  return (
    <IntlProvider messages={messages[locale]} locale={locale} key={locale}>
      {render(setLocale)}
    </IntlProvider>
  );
}

export default I18n;