#!/usr/bin/env bash

echo "install nginx controller"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml

echo "create configmap"
kubectl apply -f ../firebase-configmap.yaml

echo "installing chart (name: opm)..."
helm install --name opm ../
sleep 30

echo "initialize replica set"
kubectl exec opm-mongodb-0 -c mongodb-container -- mongo --eval 'rs.initiate({_id: "MainRepSet", version: 1, members: [ {_id: 0, host: "opm-mongodb-0.opm-mongodb.default.svc.cluster.local:27017"}, {_id: 1, host: "opm-mongodb-1.opm-mongodb.default.svc.cluster.local:27017"} ]});'

echo "create ingress resources"
kubectl apply -f ../orders-ingress.yaml -f ../portal-ingress.yaml

echo "installation completed"