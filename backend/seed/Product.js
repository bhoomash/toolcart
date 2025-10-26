const Product = require("../models/Product");

const products = [
  {
    _id: "65a7e45902e12c44f599444e",
    title: "UiPath Studio Professional",
    description: "Comprehensive RPA development platform for building automation workflows with drag-and-drop interface, advanced debugging capabilities, and extensive activity library.",
    price: 4200,
    discountPercentage: 15.0,
    stockQuantity: 25,
    brand: "65a7e20102e12c44f59943da", // UiPath
    category: "65a7e24602e12c44f599442c", // RPA Tools
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f599444f",
    title: "Automation Anywhere Enterprise A2019",
    description: "Cloud-native RPA platform with AI-powered automation capabilities, advanced analytics, enterprise-grade security, and cognitive automation features.",
    price: 5500,
    discountPercentage: 12.5,
    stockQuantity: 18,
    brand: "65a7e20102e12c44f59943db", // Automation Anywhere
    category: "65a7e24602e12c44f599442c", // RPA Tools
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
    images: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994450",
    title: "Blue Prism Digital Workforce",
    description: "Enterprise-grade RPA platform with robust security, scalability, governance features for large-scale automation deployments and digital workforce management.",
    price: 6200,
    discountPercentage: 10.0,
    stockQuantity: 12,
    brand: "65a7e20102e12c44f59943dc", // Blue Prism
    category: "65a7e24602e12c44f599442c", // RPA Tools
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994451",
    title: "Microsoft Power Automate Premium",
    description: "Low-code automation platform that connects apps and services to automate workflows and business processes with AI capabilities and premium connectors.",
    price: 1200,
    discountPercentage: 20.0,
    stockQuantity: 50,
    brand: "65a7e20102e12c44f59943dd", // Microsoft Power Automate
    category: "65a7e24602e12c44f5994431", // Workflow Orchestration
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994452",
    title: "Selenium WebDriver Suite",
    description: "Open-source web automation framework supporting multiple programming languages and browsers for comprehensive testing automation and web scraping.",
    price: 0,
    discountPercentage: 0,
    stockQuantity: 999,
    brand: "65a7e20102e12c44f59943e8", // Selenium
    category: "65a7e24602e12c44f599442d", // Test Automation
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994453",
    title: "Jenkins Enterprise Edition",
    description: "Leading open-source automation server for building, testing, and deploying code with thousands of plugins, enterprise support, and advanced security.",
    price: 2500,
    discountPercentage: 8.0,
    stockQuantity: 35,
    brand: "65a7e20102e12c44f59943ef", // Jenkins
    category: "65a7e24602e12c44f599442e", // CI/CD Platforms
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
    images: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994454",
    title: "Terraform Enterprise",
    description: "Infrastructure as Code tool for building, changing, and versioning infrastructure safely and efficiently across multiple cloud providers with policy management.",
    price: 3800,
    discountPercentage: 15.5,
    stockQuantity: 28,
    brand: "65a7e20102e12c44f59943f8", // Terraform
    category: "65a7e24602e12c44f599442f", // Infrastructure as Code
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994455",
    title: "Ansible Automation Platform",
    description: "Simple, agentless automation platform that makes it easy to automate application deployment, configuration management, and orchestration at scale.",
    price: 2800,
    discountPercentage: 12.0,
    stockQuantity: 42,
    brand: "65a7e20102e12c44f59943f7", // Ansible
    category: "65a7e24602e12c44f5994430", // Configuration Management
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994456",
    title: "Cypress Test Automation Framework",
    description: "Next generation front-end testing tool built for modern web applications with time-travel debugging, real-time reloads, and automatic waiting.",
    price: 1800,
    discountPercentage: 18.0,
    stockQuantity: 65,
    brand: "65a7e20102e12c44f59943ea", // Cypress
    category: "65a7e24602e12c44f599442d", // Test Automation
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994457",
    title: "Apache Airflow Workflow Platform",
    description: "Open-source workflow management platform to programmatically author, schedule, and monitor data pipelines and complex workflows with rich UI.",
    price: 3200,
    discountPercentage: 10.5,
    stockQuantity: 22,
    brand: "65a7e20102e12c44f59943ff", // Apache Airflow
    category: "65a7e24602e12c44f5994431", // Workflow Orchestration
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
    images: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994458",
    title: "Zapier Professional",
    description: "Automation platform that connects your favorite apps and services to automate workflows without coding, featuring 5000+ app integrations.",
    price: 900,
    discountPercentage: 25.0,
    stockQuantity: 100,
    brand: "65a7e20102e12c44f59943de", // Zapier
    category: "65a7e24602e12c44f5994431", // Workflow Orchestration
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994459",
    title: "Katalon Studio Enterprise",
    description: "Comprehensive test automation solution for web, API, mobile, and desktop applications with AI-powered test generation and execution.",
    price: 2200,
    discountPercentage: 14.0,
    stockQuantity: 38,
    brand: "65a7e20102e12c44f59943e7", // Katalon
    category: "65a7e24602e12c44f599442d", // Test Automation
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f599445a",
    title: "Docker Enterprise Platform",
    description: "Containerization platform that enables developers to package applications with dependencies for consistent deployment across any environment.",
    price: 3500,
    discountPercentage: 11.0,
    stockQuantity: 45,
    brand: "65a7e20102e12c44f59943fb", // Docker
    category: "65a7e24602e12c44f5994437", // DevOps Tools
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
    images: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f599445b",
    title: "Kubernetes Orchestration Platform",
    description: "Open-source container orchestration platform for automating deployment, scaling, and management of containerized applications at enterprise scale.",
    price: 4100,
    discountPercentage: 13.5,
    stockQuantity: 30,
    brand: "65a7e20102e12c44f59943fc", // Kubernetes
    category: "65a7e24602e12c44f5994437", // DevOps Tools
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f599445c",
    title: "GitHub Actions Enterprise",
    description: "CI/CD platform that automates build, test, and deployment workflows directly from GitHub repositories with marketplace of pre-built actions.",
    price: 1600,
    discountPercentage: 16.0,
    stockQuantity: 55,
    brand: "65a7e20102e12c44f59943f0", // GitHub Actions
    category: "65a7e24602e12c44f599442e", // CI/CD Platforms
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f599445d",
    title: "Postman API Testing Suite",
    description: "Comprehensive API development environment for testing, documenting, and monitoring APIs with automated testing capabilities and team collaboration.",
    price: 1400,
    discountPercentage: 22.0,
    stockQuantity: 75,
    brand: "65a7e20102e12c44f59943ee", // Postman
    category: "65a7e24602e12c44f5994433", // API Automation
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f599445e",
    title: "ABBYY FlexiCapture",
    description: "Intelligent document processing platform that automatically extracts data from documents and forms using OCR and machine learning technologies.",
    price: 5800,
    discountPercentage: 9.0,
    stockQuantity: 15,
    brand: "65a7e20102e12c44f59943e4", // ABBYY
    category: "65a7e24602e12c44f599443a", // Document Processing
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f599445f",
    title: "Nintex Process Platform",
    description: "Process management and workflow automation platform that helps organizations discover, manage, and optimize business processes with drag-and-drop design.",
    price: 3300,
    discountPercentage: 17.0,
    stockQuantity: 32,
    brand: "65a7e20102e12c44f59943e6", // Nintex
    category: "65a7e24602e12c44f5994431", // Workflow Orchestration
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994460",
    title: "Appium Mobile Testing",
    description: "Open-source automation framework for mobile app testing that supports native, hybrid, and mobile web applications across iOS and Android platforms.",
    price: 0,
    discountPercentage: 0,
    stockQuantity: 999,
    brand: "65a7e20102e12c44f59943eb", // Appium
    category: "65a7e24602e12c44f5994434", // Mobile Automation
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994461",
    title: "Puppet Enterprise",
    description: "Configuration management tool that automates infrastructure provisioning, configuration, and management across hybrid cloud environments with compliance reporting.",
    price: 3600,
    discountPercentage: 12.8,
    stockQuantity: 26,
    brand: "65a7e20102e12c44f59943f9", // Puppet
    category: "65a7e24602e12c44f5994430", // Configuration Management
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
    images: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  },
  {
    _id: "65a7e45902e12c44f5994462",
    title: "TestComplete UI Automation",
    description: "Comprehensive automated testing platform for desktop, web, and mobile applications with scriptless test creation and AI-powered object recognition.",
    price: 2900,
    discountPercentage: 19.0,
    stockQuantity: 41,
    brand: "65a7e20102e12c44f59943e9", // TestComplete
    category: "65a7e24602e12c44f599442d", // Test Automation
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    ],
    isDeleted: false,
    updatedAt: "2024-02-07T09:22:57.840Z",
  }
];

exports.seedProduct = async () => {
  try {
    await Product.insertMany(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.log("Error while seeding products:", error);
  }
};