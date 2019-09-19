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

        return $this->json('true', 201);
    }

    /**
     * @Route("/products/delete/{id}", name="delete_product", methods="DELETE")
     */
    public function deleteUser($id, ProductService $productService)
    {
        // On récupére l'utilisateur
        $product = $this->getDoctrine()
            ->getRepository(Product::class)
            ->find($id);
        // Si null 
        if (!$product) {
            return $this->json('Pas de produit pour l\'id ' . $id);
        }
        try {
            // Try to delete user
            $productService->deleteProduct($product);
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
        return $this->json(true, 201);
    }
}
