export const SITE_TITLE = "Import-H";
export const API_URL = "http://3.34.167.7:8090";
export const CLIENT_URL = "http://localhost:3000";

export const OAuth = {
  google: {
    url: "https://accounts.google.com/o/oauth2/v2/auth",
    provider: "google",
    client_id:
      "702289231092-dkq4a7bmqp9o9e7helngtv1tgnf4cf1i.apps.googleusercontent.com",
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  },
  github: {
    url: "https://github.com/login/oauth/authorize",
    provider: "github",
    client_id: "eb2842ff773edad761e2",
    response_type: "code",
    scope: "id,name,email,avatar_url",
  },
};
