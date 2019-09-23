<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\BabyCheck;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;

class BabyCheckService extends DefaultController
{
    private $validator;
    private $entityManager;
    public function __construct(ValidatorInterface $validator, EntityManagerInterface $entityManager)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }
    /**
     * @param BabyCheck $babycheck
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If babycheck saved
     */
    public function addBabycheck(BabyCheck $babycheck)
    {

        // Validons notre entité via le composant Validator
        $errors = $this->validator->validate($babycheck);

        $babycheck->setQuantityOfBottle($babycheck->getQuantityOfBottle());
        $babycheck->setPee($babycheck->getPee());
        $babycheck->setPoop($babycheck->getPoop());
        $babycheck->setVitamin($babycheck->getVitamin());
        $babycheck->setNose($babycheck->getNose());
        $babycheck->setEye($babycheck->getEye());
        $babycheck->setCommentary($babycheck->getCommentary());

        if (count($errors) > 0) {
            // Levons une exception personnalisée
            $e = new ValidatorErrorException();
            $e->setErrors($errors);
            throw $e;
        }
        $this->save($babycheck);
        return true;
    }

    /**
     * @param babycheck $babycheck
     * 
     * @return true If babycheck deleted
     */
    // public function deletebabycheck(babycheck $babycheck)
    // {
    //     $this->entityManager->remove($babycheck);
    //     $this->entityManager->flush();
    //     return true;
    // }

    /**
     * @param babycheck $babycheck
     */
    public function save(babycheck $babycheck)
    {
        // On sauvegarde l'entité
        $this->entityManager->persist($babycheck);
        $this->entityManager->flush();
    }

    /**
     * @param babycheck $babycheck, $patchData
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If user edited
     */
    // public function editbabycheck(babycheck $babycheck, $patchData)
    // {
    //     $errors = $this->validator->validate($babycheck);

    //     // Name
    //     $name = $patchData->getName();
    //     if ($name) {
    //         $babycheck->setName($name);
    //     }

    //     // Quantity
    //     $quantity = $patchData->getQuantity();
    //     if ($quantity) {
    //         $babycheck->setQuantity($quantity);
    //     }

    //     // Archive
    //     $archive = $patchData->getArchive();
    //     if ($archive) {
    //         $babycheck->setPassword($archive);
    //     }

    //     $errors = $this->validator->validate($babycheck);
    //     if (count($errors) > 0) {
    //         // Levons une exception personnalisée
    //         $e = new ValidatorErrorException();
    //         $e->setErrors($errors);
    //         throw $e;
    //     }

    //     $this->save($babycheck);
    //     return true;
    // }
}
