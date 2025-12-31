import { Category, Level, ValidTag } from "../../../db/constants";
import type { QuestionForCategoryAndLevel } from "../../../lib/types";

export const juniorAdvanced: QuestionForCategoryAndLevel<
    typeof Category.enum.devops,
    typeof Level.enum["junior-advanced"]
>[] = [
    // Docker Basics
    {
        text: "What is Docker and what problems does it solve?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.containers],
        answers: ["Docker is a containerization platform that packages applications with their dependencies into portable containers. The main problems it solves are environment consistency - 'works on my machine' becomes 'works everywhere' - and efficient resource utilization compared to VMs. Containers share the host OS kernel but isolate application processes, making them lightweight and fast to start. Docker solves dependency hell by bundling everything the app needs, simplifies deployment by shipping the same container across environments, and makes scaling easier since containers are identical and portable. I use Docker to ensure development matches production, make onboarding easier with consistent environments, and deploy applications across different infrastructure. The Docker ecosystem includes the Docker Engine for running containers, Docker Hub for sharing images, and tooling for building and orchestrating containers."],
    },
    {
        text: "What is a Docker image vs a container?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.images, ValidTag.enum.containers],
        answers: ["A Docker image is a read-only template that contains the application code, runtime, libraries, and dependencies - basically a snapshot of everything needed to run the application. A container is a running instance of an image. Think of an image as a class and a container as an instance of that class. You build an image once using a Dockerfile, then you can create many containers from that image. Images are immutable and stored in layers, while containers have a thin writable layer on top where runtime changes happen. When you run 'docker run', you're creating a container from an image. Multiple containers can run from the same image simultaneously, each isolated from the others. Images are what you push to registries and share, containers are the actual running workloads."],
    },
    {
        text: "What is a Dockerfile and how do you write one?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.dockerfile],
        answers: ["A Dockerfile is a text file with instructions for building a Docker image. You start with a FROM instruction specifying a base image, then add layers with instructions like RUN for executing commands, COPY for adding files, WORKDIR to set the working directory, ENV for environment variables, EXPOSE to document ports, and CMD or ENTRYPOINT to specify what runs when the container starts. Each instruction creates a new layer. I write Dockerfiles by choosing an appropriate base image, installing dependencies, copying application code, and specifying the startup command. Best practices include ordering instructions from least to most frequently changing for better caching, minimizing layers, cleaning up in the same RUN command to reduce size, and using specific base image tags rather than 'latest'. A well-written Dockerfile produces small, secure, reproducible images."],
    },
    {
        text: "What is the difference between CMD and ENTRYPOINT?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.dockerfile],
        answers: ["Both define what command runs when a container starts, but they work differently. CMD provides default arguments that can be overridden when you run the container. ENTRYPOINT sets the main command that always runs, and any docker run arguments get appended to it. If you use both, CMD provides default arguments to ENTRYPOINT. For example, with ENTRYPOINT ['python'] and CMD ['app.py'], running the container executes 'python app.py', but you can override the script name. Use ENTRYPOINT when the container should always run a specific executable, like a command-line tool. Use CMD for applications where you might want to override the command or provide different arguments. I typically use ENTRYPOINT for the main executable and CMD for default arguments, giving flexibility while ensuring the container has a clear primary purpose."],
    },
    {
        text: "What is the difference between COPY and ADD?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.dockerfile],
        answers: ["Both copy files from your build context into the image, but ADD has extra features that make COPY the preferred option in most cases. COPY simply copies files or directories from source to destination. ADD does the same but also auto-extracts tar files and can download files from URLs. The Docker best practice is to use COPY unless you specifically need ADD's features. Using COPY makes Dockerfiles more explicit and predictable. If I need to add a tar file and extract it, I'll use ADD, but for regular files I use COPY. The auto-extraction can be surprising if you didn't expect it. For downloading URLs, it's usually better to use RUN with curl or wget for more control and better caching. Stick with COPY for clarity unless you have a specific reason for ADD."],
    },
    {
        text: "What is Docker Compose?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum["docker-compose"]],
        answers: ["Docker Compose is a tool for defining and running multi-container applications using a YAML file. Instead of running multiple docker run commands, you define services, networks, and volumes in a docker-compose.yml file and start everything with 'docker compose up'. Each service is a container with its configuration like image, environment variables, volumes, and ports. Compose handles creating networks so services can communicate, manages dependencies with depends_on, and makes local development much easier. I use Compose for development environments where I need a database, cache, and application all running together, or for deploying simple multi-container apps. The compose file serves as documentation for how services connect. Compose is great for local development and testing, though for production orchestration at scale, Kubernetes is more appropriate."],
    },
    {
        text: "What is the difference between docker run and docker exec?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker],
        answers: ["'docker run' creates and starts a new container from an image, while 'docker exec' runs a command in an already running container. When you run 'docker run nginx', you're starting a new nginx container. When you use 'docker exec -it container_name bash', you're opening a shell in an existing container. The run command is for starting containers, exec is for interacting with running containers. I use 'docker run' to start application containers and 'docker exec' for debugging, running one-off commands, or accessing a shell in a running container to inspect logs or check configuration. A common pattern is 'docker run' to start a database container, then 'docker exec' to run database commands or migrations. You can't exec into a stopped container - it must be running. Exec is invaluable for troubleshooting without rebuilding images."],
    },
    {
        text: "What is the difference between containers and virtual machines?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker, ValidTag.enum.containers],
        answers: ["The fundamental difference is that containers share the host OS kernel while VMs each run a full operating system. A VM includes the application, binaries, libraries, and an entire guest OS, running on a hypervisor. Containers include the application and dependencies but share the kernel, making them much lighter - megabytes versus gigabytes. Containers start in seconds, VMs take minutes. You can run many more containers on a host than VMs because of the lower overhead. VMs provide stronger isolation since each has its own kernel, while containers share the kernel but use namespaces and cgroups for isolation. I use containers for microservices, CI/CD, and most modern applications where portability and density matter. VMs are better when you need different operating systems, stronger security isolation, or legacy applications. Containers are about efficiency and portability, VMs about isolation and flexibility."],
    },
    {
        text: "What is a Docker registry?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.docker],
        answers: ["A Docker registry is a storage and distribution system for Docker images. Docker Hub is the default public registry, but you can also use private registries like AWS ECR, Google Container Registry, Azure Container Registry, or self-hosted registries. Registries organize images by repository names and tags. When you run 'docker pull nginx', it downloads from Docker Hub. You push images to registries with 'docker push' after building them locally. I use public registries for open-source base images and private registries for proprietary application images. Private registries offer access control, vulnerability scanning, and integration with CI/CD pipelines. For production, I prefer managed registries like ECR that integrate with cloud IAM. Registries can be geo-replicated for faster pulls across regions. Understanding registries is essential for distributing container images across environments and teams."],
    },

    // CI/CD Basics
    {
        text: "What is CI/CD and why is it important?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"]],
        answers: [
            "CI/CD stands for Continuous Integration and Continuous Delivery, or sometimes Continuous Deployment. It's essentially the practice of automating the process of getting code from a developer's machine into production. Continuous Integration means developers frequently merge their code changes into a shared repository, and each merge triggers automated builds and tests. This catches integration issues early when they're easier to fix. Continuous Delivery extends this by automatically preparing code for release to production. The code is always in a deployable state, and releases can happen at the push of a button. Continuous Deployment goes one step further and automatically deploys every change that passes the automated tests. The importance really comes down to speed and reliability. Before CI/CD, teams might spend days or weeks doing integration and manual testing before a release. Now, we can deploy multiple times per day with confidence because every change is automatically validated. It reduces human error, gives developers faster feedback, and lets teams ship features to users much more quickly. It's become essential for any team that wants to move fast without breaking things.",
        ],
    },
    {
        text: "What is the difference between continuous integration, continuous delivery, and continuous deployment?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"]],
        answers: [
            "These three practices build on each other. Continuous Integration is the foundation. It's the practice where developers frequently merge their code into a shared repository, ideally multiple times a day. Each merge triggers an automated build and test suite. The goal is to detect integration problems early and keep the codebase in a consistently working state. Continuous Delivery builds on CI by ensuring that code is always in a releasable state. After passing automated tests, the code goes through additional stages like staging environment deployment, performance testing, and security scans. At the end, you have a production-ready artifact that can be deployed with a single manual approval. The key point is that deployment to production still requires human intervention. Continuous Deployment takes it one step further by removing that manual step. Every change that passes all automated tests automatically goes to production without human intervention. This requires a very mature testing and monitoring setup because there's no human gate before production. Most companies start with CI, progress to Continuous Delivery, and some eventually move to Continuous Deployment once they have confidence in their automated quality gates.",
        ],
    },
    {
        text: "What are build artifacts?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"]],
        answers: [
            "Build artifacts are the output files produced by your build process that are needed to run or deploy your application. They're essentially the packaged, production-ready version of your code. For a JavaScript application, artifacts might include the bundled and minified JavaScript files, CSS, and static assets that webpack or another bundler produces. For a Java application, it would be the JAR or WAR file. For containerized applications, the artifact is typically a Docker image. The important thing about artifacts is that they're immutable and versioned. Once you build an artifact, you don't rebuild it for different environments. The same artifact that passed testing in staging is the exact same artifact you deploy to production. This eliminates works on my machine problems and ensures consistency. Artifacts are stored in artifact repositories like AWS S3, Google Cloud Storage, or specialized tools like Artifactory or Nexus. They're usually tagged with the git commit hash or build number so you can trace exactly what code went into them. If you need to rollback, you just redeploy a previous artifact. This traceability and reproducibility is a key benefit of having proper artifact management.",
        ],
    },
    {
        text: "What are deployment environments (dev, staging, production)?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum["ci-cd"]],
        answers: [
            "Deployment environments are separate instances of your application that serve different purposes in the development and release process. The most common setup has three environments. Development or dev is where developers test their changes. It might get deployed on every commit or pull request. Data can be reset frequently, and it's okay if it breaks. The goal is rapid feedback during development. Staging is a production-like environment for final testing before release. It should mirror production as closely as possible in terms of configuration, data structure, and infrastructure. This is where you catch issues that only appear in production-like conditions. QA testing, performance testing, and stakeholder demos happen here. Production is the live environment serving real users. Changes here need to be carefully managed with proper monitoring and rollback capabilities. Some teams add additional environments. Preview environments spin up for each pull request so reviewers can see changes in action. QA environments are dedicated for quality assurance testing. UAT environments are for user acceptance testing with stakeholders. The pipeline promotes the same artifact through environments in sequence. Code passes through dev and staging before reaching production, with each environment adding confidence that the release is ready.",
        ],
    },

    // Monitoring Basics
    {
        text: "What is application monitoring and why is it important?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring, ValidTag.enum.observability],
        answers: [
            "Application monitoring is the practice of tracking your application's behavior, performance, and health in real-time. It's about having visibility into what's happening inside your running systems so you can detect problems, understand user experience, and make data-driven decisions. It's critically important for several reasons. First, you can't fix what you can't see. Without monitoring, you only learn about problems when users complain, and by then the damage is done. Good monitoring lets you detect issues before they impact users, or at least respond quickly when they do. Second, it provides data for debugging. When something goes wrong at three in the morning, you need to quickly understand what changed and what's failing. Dashboards, logs, and traces give you that context. Third, it helps with capacity planning. By tracking resource usage over time, you can predict when you'll need to scale up. Fourth, it creates accountability and helps measure SLAs. You can prove to stakeholders that the system is meeting performance targets, or identify when it's not. The key components are typically metrics, logs, and traces, often called the three pillars of observability. Together they give you a complete picture of system behavior.",
        ],
    },
    {
        text: "What are log levels and how do you use them?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.logging],
        answers: [
            "Log levels are a way to categorize log messages by their severity or importance. The standard levels from least to most severe are typically DEBUG, INFO, WARN, ERROR, and sometimes FATAL or CRITICAL. DEBUG is for detailed information useful during development or troubleshooting. Things like variable values, function entry and exit, or detailed state information. You usually disable this in production because it's too verbose. INFO is for general operational messages that confirm things are working normally. User logged in, payment processed, job completed. These help you understand the normal flow of your application. WARN is for potentially harmful situations that aren't errors yet. A deprecated API being called, a retry that succeeded, or approaching a resource limit. These are things you might want to investigate but aren't immediately critical. ERROR is for actual problems that prevented an operation from completing. Failed database queries, unhandled exceptions, or API failures. These typically need attention. The key is using levels consistently so you can filter logs appropriately. In production, you might only collect INFO and above to reduce noise. During an incident, you might temporarily enable DEBUG to get more detail. Most logging frameworks let you set the level per component or module so you can get detailed logs from a specific area without overwhelming yourself with output from everywhere.",
        ],
    },
    {
        text: "What is the difference between logging, metrics, and tracing?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.monitoring, ValidTag.enum.logging, ValidTag.enum.observability],
        answers: [
            "Logs, metrics, and traces are the three pillars of observability, and they each serve different purposes. Logs are discrete events with timestamps. They record what happened at a specific moment, like a user login, an error, or a request being processed. They're great for debugging specific issues because they capture rich context. The downside is they can be expensive to store and search at scale. Metrics are numeric measurements over time. Things like CPU usage, request count, error rate, or response latency. They're aggregated, so instead of recording every event, you're tracking summaries like averages, percentiles, or counts per time window. Metrics are efficient to store and query, making them great for dashboards, alerting, and understanding trends. But they lose individual event detail. Traces follow a single request as it flows through your system across multiple services. Each step in the request is a span, and together they form a trace. This is essential for microservices because a single user action might touch ten different services. Tracing shows you exactly where time was spent and where failures occurred in that chain. In practice, you use all three together. Metrics tell you something is wrong, traces help you find where, and logs tell you why.",
        ],
    },
    {
        text: "What is structured logging?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.logging],
        answers: [
            "Structured logging means outputting log messages in a consistent, machine-parseable format rather than free-form text strings. Instead of logging something like 'User john@example.com logged in from IP 192.168.1.1', you log a structured object like a JSON message with fields for event type, user email, IP address, and timestamp. The benefits are huge for operability. First, you can easily search and filter. Want all login events from a specific IP? With structured logs, that's a simple query. With plain text, you're writing fragile regex patterns. Second, you can aggregate and analyze. Count logins per hour, find the most common error types, or build dashboards. Third, it's consistent. New team members can understand log formats without reading the code that produced them. Tools like the ELK stack, Datadog, or CloudWatch Logs Insights work much better with structured data. In implementation, I typically use a logging library configured to output JSON. Each log call includes both a message and a set of key-value pairs for context. I establish conventions for common fields like request ID, user ID, and service name so they're consistent across the codebase. The request ID is particularly important because it lets you correlate all logs from a single user request across different services.",
        ],
    },

    // Kubernetes Basics
    {
        text: "What is Kubernetes and what problems does it solve?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes],
        answers: ["Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. It solves problems that arise when running containers at scale - service discovery, load balancing, self-healing, rolling updates, resource management, and configuration management. With Docker alone, you'd manually start containers on servers and handle failures. Kubernetes abstracts away the infrastructure, letting you declare desired state and it maintains it. If a container crashes, Kubernetes restarts it. If a node fails, it reschedules containers elsewhere. It handles scaling by adding or removing pod replicas based on load. I use Kubernetes for production applications that need high availability, automatic scaling, zero-downtime deployments, and multi-cloud portability. The learning curve is steep, but it's the industry standard for container orchestration and provides a consistent platform regardless of underlying infrastructure."],
    },
    {
        text: "What are pods and why are they the smallest deployable unit?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum.pods],
        answers: ["Pods are the smallest deployable unit in Kubernetes - a group of one or more containers that share storage and network resources. Containers in a pod share an IP address, can communicate via localhost, and share volumes. Pods are the smallest unit because Kubernetes manages and scales at the pod level, not individual containers. Why group containers? Sometimes containers are tightly coupled and should be co-located. A common pattern is a main application container with a sidecar that handles logging, proxying, or other cross-cutting concerns. They need to scale together and share resources. Single-container pods are most common though. Pods are ephemeral - they can be killed and replaced at any time. You don't manage pods directly in production; you use higher-level controllers like Deployments that manage pods for you and ensure the right number are running. Understanding pods is fundamental to Kubernetes because every workload runs in pods."],
    },
    {
        text: "What are deployments and how do they manage pods?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum.deployments],
        answers: ["A Deployment is a Kubernetes resource that manages the lifecycle of pods, providing declarative updates and rollout capabilities. Instead of managing pods directly, you create a Deployment that specifies the desired state - what container image to run, how many replicas, and configuration. Kubernetes then ensures this state is maintained. If a pod dies, the Deployment creates a new one. When you update the Deployment, it performs a rolling update by gradually replacing old pods with new ones. Deployments create ReplicaSets under the hood that actually manage the pods. The key benefits are declarative configuration, rolling updates with zero downtime, easy rollbacks if something goes wrong, and automatic healing. I use Deployments for stateless applications, web servers, and APIs. You define the Deployment in YAML, apply it with kubectl, and Kubernetes handles the rest. It's the primary way to run applications in production on Kubernetes."],
    },
    {
        text: "What are services and what types are there (ClusterIP, NodePort, LoadBalancer)?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes, ValidTag.enum.services],
        answers: ["A Kubernetes Service provides a stable network endpoint to access a group of pods. Pods are ephemeral with changing IPs, so Services give you a consistent way to reach them. ClusterIP is the default type - it creates an internal IP accessible only within the cluster. Other pods can reach the service, but external traffic can't. This is used for internal communication between services. NodePort exposes the service on each node's IP at a static port. External traffic can reach the service via any node's IP and that port. It's simpler than LoadBalancer but requires you to know node IPs. LoadBalancer provisions an external load balancer from your cloud provider and routes external traffic to the service. This is how you expose applications to the internet in production. Services use label selectors to find pods and automatically load balance across them. They're essential for service discovery - pods find each other through service names."],
    },
    {
        text: "What are namespaces?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes],
        answers: ["Namespaces are a way to divide cluster resources between multiple users, teams, or projects. They're like virtual clusters within a physical cluster. Resources like pods, services, and deployments live within a namespace and have names that must be unique within that namespace, but not across namespaces. You might have 'development', 'staging', and 'production' namespaces, or namespaces per team. Namespaces help with resource isolation and access control - you can set resource quotas per namespace and use RBAC to control who can access what. They also make cleanup easier - deleting a namespace deletes all resources within it. The default namespace is used if you don't specify one, but I always create explicit namespaces for organization. Some resources like nodes and persistent volumes are cluster-wide and not namespaced. Namespaces are essential for multi-tenant clusters and organizing workloads in larger deployments."],
    },
    {
        text: "What is kubectl and what are common commands?",
        level: Level.enum["junior-advanced"],
        category: Category.enum.devops,
        tags: [ValidTag.enum.kubernetes],
        answers: ["kubectl is the command-line tool for interacting with Kubernetes clusters. It's how you create, inspect, update, and delete resources. Common commands include 'kubectl get pods' to list pods, 'kubectl describe pod name' for detailed info, 'kubectl logs pod-name' to view logs, 'kubectl apply -f file.yaml' to create or update resources from a file, 'kubectl delete pod name' to delete resources, 'kubectl exec -it pod-name -- bash' to get a shell in a container, and 'kubectl port-forward' to access services locally. I use 'kubectl get all' to see everything in a namespace, 'kubectl config get-contexts' to see available clusters, and 'kubectl rollout status' to watch deployments. The '-n namespace' flag specifies a namespace. 'kubectl explain' shows documentation for resource types. Learning kubectl is essential for Kubernetes work - it's your primary interface for cluster management."],
    },
];
