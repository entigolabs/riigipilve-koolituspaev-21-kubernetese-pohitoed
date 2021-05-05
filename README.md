 


1)Install minikube 

https://minikube.sigs.k8s.io/docs/start/

```
$ minikube version
minikube version: v1.19.0
commit: 15cede53bdc5fe242228853e737333b09d4336b5
```

2) Install skaffold
https://skaffold.dev/docs/install/

```
$ skaffold version
v1.23.0
```

3) Install kubectl
http://pwittrock.github.io/docs/tasks/tools/install-kubectl/

```
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.1", GitCommit:"7879fc12a63337efff607952a323df90cdc7a335", GitTreeState:"clean", BuildDate:"2020-04-08T17:38:50Z", GoVersion:"go1.13.9", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"20", GitVersion:"v1.20.2", GitCommit:"faecb196815e248d3ecfb03c680a4507229c2a56", GitTreeState:"clean", BuildDate:"2021-01-13T13:20:00Z", GoVersion:"go1.15.5", Compiler:"gc", Platform:"linux/amd64"}
```

4) Start minikube
```
$ minikube start --cpus=2 --memory=2048M
```

5) Make sure kubectl is configured to use minikube.
```
$ kubectl config use-context minikube
Switched to context "minikube".

$kubectl config get-contexts
CURRENT   NAME       CLUSTER    AUTHINFO   NAMESPACE
*         minikube   minikube   minikube   default

$ kubectl get node
NAME       STATUS   ROLES                  AGE   VERSION
minikube   Ready    control-plane,master   25h   v1.20.2
```

6) Clone this repo
```
$ git clone git@github.com:entigolabs/riigipilve-koolituspaev-21-kubernetese-pohitoed.git
$ cd riigipilve-koolituspaev-21-kubernetese-pohitoed
```
7) Install haproxy ingress controller
```
$ kubectl apply -f haproxy-ingress-controller.yaml
$ kubectl get pods -n ingress-controller
```

8) Create a hosts record in your host computer. This will append a line to your /etc/hosts file containing the minikube vm IP and  demo.entigo.io host.
$ echo "$(minikube ip) demo.entigo.io" | sudo tee -a /etc/hosts 

9) Start skaffold. It will build and deploy the application.
This command will remain running. While it is running you can make changes to any part of the project and it will apply those changes immediately. 
You will also see the applications logs in the terminal.
```
$ skaffold dev
```

10) Point your browser to demo.entigo.io
