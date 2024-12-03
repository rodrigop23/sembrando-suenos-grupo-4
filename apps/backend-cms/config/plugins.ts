export default ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "20191544@aloe.ulima.edu.pe",
        defaultReplyTo: "20191544@aloe.ulima.edu.pe",
        testAddress: "20191544@aloe.ulima.edu.pe",
      },
    },
  },
});
