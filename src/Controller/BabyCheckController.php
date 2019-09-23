<?php

namespace App\Controller;

use App\Entity\BabyCheck;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Exception\ValidatorErrorException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Service\BabyCheckService;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Validation;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * BabyCheck controller.
 */
class BabyCheckController extends AbstractFOSRestController
{
    /**
     * Get all BabyChecks.
     * @Rest\Get("/babychecks/get_all", name="_get_babychecks")
     * 
     * @return Response
     */
    public function getAllBabyCheck()
    {
        // On récupére les produits
        $babychecks = $this->getDoctrine()
            ->getRepository(BabyCheck::class)
            ->findAll();


        // Si null 
        if (!$babychecks) {
            return $this->json('Aucun check de bébé', 404);
        } else {
            return $this->json($babychecks, 201);
        }
    }
    /**
     * Post a BabyCheck.
     * @Rest\Post("/babychecks/save_babycheck", name="save_babycheck")
     * 
     * @return Response
     */
    public function saveBabyCheck(Request $request, SerializerInterface $serializer, BabyCheckService $babycheckService)
    {

        $postData = $request->getContent();
        $babycheck = $serializer->deserialize($postData, BabyCheck::class, 'json');

        try {
            // Try to save user
            $babycheckService->addBabyCheck($babycheck);
        } catch (ValidatorErrorException $e) {
            $errors = $e->getErrors();
            // If error
            if (count($errors) > 0) {
                $result['errors'] = [];
                foreach ($errors as $error) {
                    $result['errors'][] = $error->getMessage();
                }
                return $this->json($result, 422);
            }
        }

        return $this->json($babycheck, 201);
    }

    /**
     * @Route("/products/delete/{name}", name="delete_product", methods="DELETE")
     */
    // public function deleteProduct($name, ProductService $productService)
    // {
    //     // On récupére l'utilisateur
    //     $product = $this->getDoctrine()
    //         ->getRepository(Product::class)
    //         ->findOneBy(['name' => $name]);

    //     // Si null 
    //     if (!$product) {
    //         return $this->json('Produit ' . $name . ' non trouvé');
    //     }
    //     try {
    //         // Try to delete user
    //         $productService->deleteProduct($product);
    //     } catch (ValidatorErrorException $e) {
    //         $errors = $e->getErrors();
    //         // If error
    //         if (count($errors) > 0) {
    //             $result = array(
    //                 "status" => 'nope'
    //             );
    //             foreach ($errors as $error) {
    //                 $result['message'][] = $error->getMessage();
    //             }
    //             return $this->json($result, 422);
    //         }
    //     }
    //     $result = array(
    //         "message"  => $name . ' supprimé',
    //         "status" => 'ok'
    //     );
    //     return $this->json($result, 201);
    // }

    /**
     * @Route("/products/edit/{name}", name="edit_product", methods="PATCH")
     */
    // public function editProduct($name, ProductService $productService, Request $request, SerializerInterface $serializer)
    // {
    //     $patchData = $request->getContent();
    //     $patchProduct = $serializer->deserialize($patchData, Product::class, 'json');

    //     // On récupére le produit
    //     $product = $this->getDoctrine()
    //         ->getRepository(Product::class)
    //         ->findOneBy(['name' => $name]);

    //     // Si null 
    //     if (!$product) {
    //         return $this->json('Produit ' . $name . ' non trouvé');
    //     }
    //     try {
    //         // Try to edit product
    //         $productService->editProduct($product, $patchProduct);
    //     } catch (ValidatorErrorException $e) {
    //         $errors = $e->getErrors();
    //         // If error
    //         if (count($errors) > 0) {
    //             $result['errors'] = [];
    //             foreach ($errors as $error) {
    //                 $result['errors'][] = $error->getMessage();
    //             }
    //             return $this->json($result, 422);
    //         }
    //     }
    //     return $this->json($product, 201);
    // }
}
