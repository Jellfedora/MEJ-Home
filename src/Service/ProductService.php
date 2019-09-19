<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\Product;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;

class ProductService extends DefaultController
{
    private $validator;
    private $entityManager;
    public function __construct(ValidatorInterface $validator, EntityManagerInterface $entityManager)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }
    /**
     * @param Product $product
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If product saved
     */
    public function addProduct(Product $product)
    {

        // Validons notre entité via le composant Validator
        $errors = $this->validator->validate($product);

        $product->setName($product->getName());
        $product->setQuantity($product->getQuantity());
        $product->setArchive($product->getArchive());
        if (count($errors) > 0) {
            // Levons une exception personnalisée
            $e = new ValidatorErrorException();
            $e->setErrors($errors);
            throw $e;
        }
        $this->save($product);
        return true;
    }

    /**
     * @param Product $product
     */
    public function save(Product $product)
    {
        // On sauvegarde l'entité
        $this->entityManager->persist($product);
        $this->entityManager->flush();
    }
}
