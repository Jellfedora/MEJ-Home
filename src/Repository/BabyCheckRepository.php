<?php

namespace App\Repository;

use App\Entity\BabyCheck;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method BabyCheck|null find($id, $lockMode = null, $lockVersion = null)
 * @method BabyCheck|null findOneBy(array $criteria, array $orderBy = null)
 * @method BabyCheck[]    findAll()
 * @method BabyCheck[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BabyCheckRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BabyCheck::class);
    }

    // /**
    //  * @return BabyCheck[] Returns an array of BabyCheck objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BabyCheck
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function findAll()
    {
        return $this->findBy(array(), array('id' => 'DESC'));
    }
}
