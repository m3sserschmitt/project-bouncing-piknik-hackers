import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import org.json.JSONObject;

public class Request {

    private String url;
    private String user;
    private String token;

    public Request(String targetUrl, String user) {
        this.url = targetUrl;
        this.user = user;
    }

    public String createTestUserQuery() {
        return "{\"query\": \"mutation CreateUser{createUser(userInput: {email: \\\"" + this.user
                + "@example.com\\\" password: \\\"password\\\" firstName: \\\"Test\\\" lastName: \\\"User\\\"}) {id}}\",\"variables\": {},\"operationName\": \"CreateUser\"}";
    }

    public String getTestUserProfileQuery() {
        return "{ \"query\": \"query Profile{profile {id}}\", \"variables\": {}, \"operationName\": \"Profile\"}";
    }

    public String getCorrectCredentialsTestLoginQuery() {
        return "{\"query\": \"mutation Login{ login(loginInput: { email: \\\"" + this.user
                + "@example.com\\\", password: \\\"password\\\" }) { token } }\", \"variables\": {}, \"operationName\": \"Login\"}";
    }

    public String getInvalidCredentialsTestLoginQuery() {
        return "{\"query\": \"mutation Login{ login(loginInput: { email: \\\"" + this.user
                + "1@example.com\\\", password: \\\"password\\\" }) { token } }\", \"variables\": {}, \"operationName\": \"Login\"}";
    }

    public String getDeleteTestUserQuery() {
        return "{\"query\": \"mutation Delete{ deleteUser(password: \\\"password\\\") { id } }\", \"variables\": {}, \"operationName\": \"Delete\"}";
    }

    public Object isNonNullResponse(String json, String action, String field) {
        JSONObject jsonObject = new JSONObject(json);

        try {
            return jsonObject.getJSONObject("data").getJSONObject(action).get(field);
        } catch (Exception ex) {
            return null;
        }
    }

    public String makeHttpRequest(String GraphQLQuery) {
        String response = "";

        try {
            URL url = new URL(this.url);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestProperty("accept", "application/json");
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");

            if (token != null) {
                connection.setRequestProperty("Authorization", token);
            }

            connection.setDoOutput(true);
            OutputStream requestStream = connection.getOutputStream();
            DataOutputStream outputStream = new DataOutputStream(requestStream);

            outputStream.writeBytes(GraphQLQuery);
            outputStream.flush();
            outputStream.close();

            InputStream responseStream = connection.getInputStream();
            InputStreamReader responseStreamReader = new InputStreamReader(responseStream);

            int currentByte = responseStreamReader.read();

            while (currentByte >= 0) {
                response += (char) currentByte;
                currentByte = responseStreamReader.read();
            }

        } catch (Exception ex) {
            System.out.println("Errors in http request to " + url + ": " + ex.toString());
        }

        return response;
    }

    public String makeTestRequest(String action, String testQuery, String field) {
        String response = makeHttpRequest(testQuery);

        System.out.println(response);

        try {
            String result = isNonNullResponse(response, action, field).toString();

            if (result == "null") {
                return null;
            }

            if (action.equals("login") && field.equals("token") && result != "null") {
                token = result;
            }

            return result;

        } catch (Exception ex) {

            return null;
        }
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getUser() {
        return this.user;
    }
}
