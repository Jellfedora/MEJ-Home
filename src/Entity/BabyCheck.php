<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use \Datetime;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BabyCheckRepository")
 */
class BabyCheck
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $quantityOfBottle;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $pee;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $poop;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $vitamin;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $nose;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $eye;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $commentary;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->registration_date = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getQuantityOfBottle(): ?int
    {
        return $this->quantityOfBottle;
    }

    public function setQuantityOfBottle(?int $quantityOfBottle): self
    {
        $this->quantityOfBottle = $quantityOfBottle;

        return $this;
    }

    public function getPee(): ?bool
    {
        return $this->pee;
    }

    public function setPee(?bool $pee): self
    {
        $this->pee = $pee;

        return $this;
    }

    public function getPoop(): ?bool
    {
        return $this->poop;
    }

    public function setPoop(?bool $poop): self
    {
        $this->poop = $poop;

        return $this;
    }

    public function getVitamin(): ?bool
    {
        return $this->vitamin;
    }

    public function setVitamin(?bool $vitamin): self
    {
        $this->vitamin = $vitamin;

        return $this;
    }

    public function getNose(): ?bool
    {
        return $this->nose;
    }

    public function setNose(?bool $nose): self
    {
        $this->nose = $nose;

        return $this;
    }

    public function getEye(): ?bool
    {
        return $this->eye;
    }

    public function setEye(?bool $eye): self
    {
        $this->eye = $eye;

        return $this;
    }

    public function getCommentary(): ?string
    {
        return $this->commentary;
    }

    public function setCommentary(?string $commentary): self
    {
        $this->commentary = $commentary;

        return $this;
    }
}
