namespace Application\Controller;

use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\View\Model\ViewModel;
use Application\Form\LoginForm;
use Application\Model\UserTable;

class AuthController extends AbstractActionController
{
    private $userTable;

    public function __construct(UserTable $userTable)
    {
        $this->userTable = $userTable;
    }

    public function loginAction()
    {
        $form = new LoginForm();
        $request = $this->getRequest();

        if ($request->isPost()) {
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $data = $form->getData();
                $user = $this->userTable->fetchUserByEmail($data['email']);
                if ($user && password_verify($data['password'], $user->password)) {
                    // Successful login
                    return new ViewModel([
                        'status' => 'success',
                        'message' => 'Login successful',
                        'user' => $user
                    ]);
                } else {
                    // Failed login
                    return new ViewModel([
                        'status' => 'error',
                        'message' => 'Invalid credentials'
                    ]);
                }
            }
        }

        return new ViewModel(['form' => $form]);
    }
}