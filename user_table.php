namespace Application\Model;

use Doctrine\ORM\EntityManager;
use Application\Entity\User;

class UserTable
{
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function fetchUserByEmail($email)
    {
        return $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
    }
}