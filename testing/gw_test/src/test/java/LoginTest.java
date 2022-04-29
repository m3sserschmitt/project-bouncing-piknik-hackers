import org.graphwalker.core.condition.EdgeCoverage;
import org.graphwalker.core.condition.VertexCoverage;
import org.graphwalker.core.generator.PathGenerator;
import org.graphwalker.core.generator.RandomPath;
import org.graphwalker.core.machine.*;
import org.graphwalker.core.model.*;
import org.junit.Test;

public class LoginTest {

    private Vertex v_NoUser;
    private Vertex v_NotLoggedIn;
    private Vertex v_LoggedIn;

    private Edge e_CreateUser;
    private Edge e_ValidCredentials;
    private Edge e_DeleteUser;
    private Edge e_AssertUserAlreadyExists;
    private Edge e_InvalidCredentials;

    private void initGraph() {
        v_NoUser.setName("noUser");
        v_NotLoggedIn.setName("notLoggedIn");
        v_LoggedIn.setName("loggedIn");

        e_CreateUser.setName("createUser");
        e_ValidCredentials.setName("validCredentials");
        e_AssertUserAlreadyExists.setName("assertUserAlreadyExists");
        e_InvalidCredentials.setName("invalidCredentials");
        e_DeleteUser.setName("deleteUser");

        e_CreateUser.setSourceVertex(v_NoUser);
        e_CreateUser.setTargetVertex(v_NotLoggedIn);

        e_AssertUserAlreadyExists.setSourceVertex(v_NoUser);
        e_AssertUserAlreadyExists.setTargetVertex(v_NoUser);

        e_ValidCredentials.setSourceVertex(v_NotLoggedIn);
        e_ValidCredentials.setTargetVertex(v_LoggedIn);

        e_InvalidCredentials.setSourceVertex(v_NotLoggedIn);
        e_InvalidCredentials.setTargetVertex(v_NotLoggedIn);

        e_DeleteUser.setSourceVertex(v_LoggedIn);
        e_DeleteUser.setTargetVertex(v_NoUser);
    }

    public LoginTest() {
        v_NoUser = new Vertex();
        v_NotLoggedIn = new Vertex();
        v_LoggedIn = new Vertex();

        e_CreateUser = new Edge();
        e_ValidCredentials = new Edge();
        e_AssertUserAlreadyExists = new Edge();
        e_InvalidCredentials = new Edge();
        e_DeleteUser = new Edge();

        initGraph();
    }

    @Test
    public void success() {

        Model model = new Model();

        model.addEdge(e_CreateUser);
        model.addEdge(e_AssertUserAlreadyExists);
        model.addEdge(e_ValidCredentials);
        model.addEdge(e_InvalidCredentials);
        model.addEdge(e_DeleteUser);

        PathGenerator pathGenerator = new RandomPath(new EdgeCoverage(100));
        Context context = new TestContext(model, pathGenerator);

        context.setNextElement(v_NoUser);

        Machine machine = new SimpleMachine(context);
        while (machine.hasNextStep()) {
            machine.getNextStep();
        }
    }

    public class TestContext extends ExecutionContext {

        private Request request;

        public TestContext(Model model, PathGenerator pathGenerator) {
            super(model, pathGenerator);

            request = new Request("http://localhost:3000/graphql", "test");
        }

        private String tryCorrectCredentialsLogin() {
            return request.makeTestRequest("login", request.getCorrectCredentialsTestLoginQuery(), "token");
        }

        private String tryInvalidCredentialsLogin() {
            return request.makeTestRequest("login", request.getInvalidCredentialsTestLoginQuery(), "token");
        }

        private String tryCreateUser() {
            return request.makeTestRequest("createUser", request.createTestUserQuery(), "id");
        }

        private String tryGetUserProfile() {
            return request.makeTestRequest("profile", request.getTestUserProfileQuery(), "id");
        }

        private String tryGetUserProfileWithToken() {
            return request.makeTestRequest("profile", request.getTestUserProfileQuery(), "id");
        }

        public String tryDeleteUser() {
            return request.makeTestRequest("deleteUser", request.getDeleteTestUserQuery(), "id");
        }

        public void assertUserAlreadyExists() {
            System.out.println("\n[+] Traversing Edge e_AssertUserAlreadyExists: changing user name\n");

            request.setUser(request.getUser() + "1");

            System.out.println("\n[+] Edge e_AssertUserAlreadyExists: username changed\n");
        }

        public void noUser() throws RuntimeException {
            System.out.println("\n[+] Visiting Vertex v_NoUser: check if user already exists\n");

            if (tryCorrectCredentialsLogin() != null) {
                System.out.println("\n[-] Error: Vertex v_NoUser: test failed\n");
                throw new RuntimeException();
            }

            System.out.println("\n[+] Vertex v_NoUser visited: test passed\n");
        }

        public void createUser() throws RuntimeException {
            System.out.println("\n[+] Traversing Edge e_CreateUser: creating test user\n");

            tryCreateUser();
        }

        public void notLoggedIn() throws RuntimeException {
            System.out.println("\n[+] Visiting Vertex v_NotLoggedIn: check if already logged in\n");

            if (tryGetUserProfile() != null) {
                System.out.println("\n[+] Error: Vertex v_NotLoggedIn: test failed!\n");
                throw new RuntimeException();
            }

            System.out.println("\n[+] Vertex v_NotLoggedIn visited: test passed!\n");
        }

        public void invalidCredentials() {
            System.out.println("\n[+] Edge e_InvalidCredentials: try to log in with invalid credentials\n");

            tryInvalidCredentialsLogin();
        }

        public void validCredentials() throws RuntimeException {
            System.out.println("\n[+] Traversing Edge e_ValidCredentials: logging in\n");

            tryCorrectCredentialsLogin();
        }

        public void loggedIn() throws RuntimeException {
            System.out.println("\n[+] Visiting Vertex v_LoggedIn: checking if logged in\n");

            if (tryGetUserProfileWithToken() == null) {
                throw new RuntimeException("\n[-] Error: Vertex v_LoggedIn visited: test failed!\n");
            }

            System.out.println("\n[+] Vertex v_LoggedIn visited: test passed!\n");
        }

        public void deleteUser() {
            System.out.println("\n[+] Edge e_DeleteUser: deleting user\n");

            tryDeleteUser();
        }
    }
}
