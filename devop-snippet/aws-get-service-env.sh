aws configure set region $(aws configure get region)
aws configure set aws_access_key_id $(aws configure get aws_access_key_id)
aws configure set aws_secret_access_key $(aws configure get aws_secret_access_key)

function getEnv
{
    while test $# -gt 0
    do
        echo "Get environments from service: $1"
        taskDefinition=$(aws ecs describe-services --cluster production --services $1 | jq -c '.services[].deployments[].taskDefinition' | sed 's/"//g')
        env=$(aws ecs describe-task-definition --task-definition $taskDefinition | jq '.taskDefinition.containerDefinitions[].environment')
        echo "$env" | jq -c '.[]'|
            while IFS= read -r line
            do
                name=$(jq '.name' <<< $line | sed 's/"//g')
                value=$(jq '.value' <<< $line | sed 's/"//g')
                echo "$1,$name,$value"
            done >> result.csv
        shift
    done
}

# Get list of AWS services and parse line by line
service_list=$(aws ecs list-services --cluster production | jq -c '.[][]' | sed 's/"//g')

# Get envs from service list
getEnv $service_list