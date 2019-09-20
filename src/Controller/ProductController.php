<?php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Exception\ValidatorErrorException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Service\ProductService;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Validation;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * Product controller.
 */
class ProductController extends AbstractFOSRestController
{
    /**
     * Get all Products.
     * @Rest\Get("/products/get_all", name="_get_products")
     * 
     * @return Response
     */
    public function getAllProducts()
    {
        // On récupére les produits
        $products = $this->getDoctrine()
            ->getRepository(Product::class)
            ->findAll();

        // Si null 
        if (!$products) {
            return $this->json('Aucun produits', 404);
        } else {
            return $this->json($products, 201);
        }
    }
    /**
     * Post a Product.
     * @Rest\Post("/products/save_product", name="save_product")
     * 
     * @return Response
     */
    public function saveProduct(Request $request, SerializerInterface $serializer, ProductService $productService)
    {

        $postData = $request->getContent();
        $product = $serializer->deserialize($postData, Product::class, 'json');

        try {
            // Try to save user
            $productService->addProduct($product);
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

        return $this->json($product->getName() . ' ajouté', 201);
    }

    /**
     * @Route("/products/delete/{name}", name="delete_product", methods="DELETE")
     */
    public function deleteProduct($name, ProductService $productService)
    {
        // On récupére l'utilisateur
        $product = $this->getDoctrine()
            ->getRepository(Product::class)
            ->findOneBy(['name' => $name]);

        // Si null 
        if (!$product) {
            return $this->json('Produit ' . $name . ' non trouvé');
        }
        try {
            // Try to delete user
            $productService->deleteProduct($product);
        } catch (ValidatorErrorException $e) {
            $errors = $e->getErrors();
            // If error
            if (count($errors) > 0) {
                $result = array(
                    "status" => 'nope'
                );
                foreach ($errors as $error) {
                    $result['message'][] = $error->getMessage();
                }
                return $this->json($result, 422);
            }
        }
        $result = array(
            "message"  => $name . ' supprimé',
            "status" => 'ok'
        );
        return $this->json($result, 201);
    }

    /**
     * @Route("/products/edit/{name}", name="edit_product", methods="PATCH")
     */
    public function editProduct($name, ProductService $productService, Request $request, SerializerInterface $serializer)
    {
        $patchData = $request->getContent();
        $patchProduct = $serializer->deserialize($patchData, Product::class, 'json');

        // On récupére le produit
        $product = $this->getDoctrine()
            ->getRepository(Product::class)
            ->findOneBy(['name' => $name]);

        // Si null 
        if (!$product) {
            return $this->json('Produit ' . $name . ' non trouvé');
        }
        try {
            // Try to edit product
            $productService->editProduct($product, $patchProduct);
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
        return $this->json($product, 201);
    }
}
