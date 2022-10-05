function getEnv
{
    while test $# -gt 0
    do
        echo "Get environments from configmap: $1"

        # Get service name from the env string
        service=$(echo "$1" | sed 's/^env-//')
        # Get the envs with json format
        env=$(kubectl get configmap $1 -o json | jq ".data")

        echo "$env" |
        # Flatten JSON format
            jq -r '[
            . as $in |
            (paths(scalars), paths((. | length == 0)?)) |
            join(".") as $key |
            $key + "," + ($in | getpath($key | split(".") | map((. | tonumber)? // .)) | tostring)
        ] | sort | .[]' |
        # Add service name before each KEY_ENV VALUE_ENV
            awk '{print "'$service'" ","$0}' >> kubernetes-env.csv
        shift
    done
}

# Get list of configmap in Kubernetes, we have 2 commands that can get the configmaps
# list=$(kubectl get configmap | grep "env" | sed 's/ .*//')
list=$(kubectl get pods -o json | jq '.items[].spec.containers[].envFrom' | grep "env" | sed '/env-configmap/d' | sed 's/.*://' | sed 's/\"//' | sed 's/\",//')

# Get envs from list
getEnv $list
