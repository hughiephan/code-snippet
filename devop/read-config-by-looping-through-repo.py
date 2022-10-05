import os
import json
import yaml
import csv

for project_folder in os.listdir():
    # Check and then loop through folder
    has_gitlab_file = False
    if (os.path.isdir(project_folder)):
        # print(project_folder)
        for file in os.listdir(project_folder):

            # If folder have gitlab-ci.yml file
            if file.endswith(".gitlab-ci.yml"):
                has_gitlab_file = True
                with open(os.path.join(project_folder, file), "r") as fd:
                    # print(fd)
                    with open('innovators.csv', 'a', newline='') as csv_file:
                        writer = csv.writer(csv_file)
                        config = yaml.safe_load(fd)

                        if (config and config.get('include')):

                            # If there is many include, we loop then parse it
                            if (not isinstance(config.get('include'), str)):
                                for x in config['include']:

                                    # Continue parsing {'project': 'server/ci-template', 'file': '/includes/package_docker.yml'}
                                    # print(project_folder)
                                    if (not isinstance(x, str) and x.get('project')):
                                        parsed_include = 'https://code.go1.com.au/' + \
                                            x['project'] + \
                                            '/raw/master' + x['file']
                                        # print(parsed_include)
                                        writer.writerow(
                                            [project_folder, parsed_include])
                                    else:
                                        writer.writerow([project_folder, x])
                            else:
                                writer.writerow(
                                    [project_folder, config.get('include')])
                        else:
                            writer.writerow(
                                    [project_folder, 'null'])

        # List file that doesn't have gitlab-ci.yml
        if (not has_gitlab_file):
            # print(project_folder)
            with open('innovators.csv', 'a', newline = '') as csv_file:
                writer=csv.writer(csv_file)
                writer.writerow([project_folder, 'null'])


# Check in resources/ci
for project_folder in os.listdir():
    # Check and then loop through folder
    has_gitlab_file = False
    resource_project_folder = project_folder + '/resources/ci'
    if (os.path.isdir(resource_project_folder)):
        # print(project_folder)
        for file in os.listdir(resource_project_folder):

            # If folder have gitlab-ci.yml file
            if file.endswith(".gitlab-ci.yml"):
                has_gitlab_file = True
                with open(os.path.join(resource_project_folder, file), "r") as fd:
                    # print(fd)
                    with open('innovators.csv', 'a', newline='') as csv_file:
                        writer = csv.writer(csv_file)
                        config = yaml.safe_load(fd)

                        if (config and config.get('include')):

                            # If there is many include, we loop then parse it
                            if (not isinstance(config.get('include'), str)):
                                for x in config['include']:

                                    # Continue parsing {'project': 'server/ci-template', 'file': '/includes/package_docker.yml'}
                                    # print(project_folder)
                                    if (not isinstance(x, str) and x.get('project')):
                                        parsed_include = 'https://code.go1.com.au/' + \
                                            x['project'] + \
                                            '/raw/master' + x['file']
                                        # print(parsed_include)
                                        writer.writerow(
                                            [project_folder, parsed_include])
                                    else:
                                        writer.writerow([project_folder, x])
                            else:
                                writer.writerow(
                                    [project_folder, config.get('include')])
                        else:
                            writer.writerow(
                                    [project_folder, 'null'])

        # List file that doesn't have gitlab-ci.yml
        if (not has_gitlab_file):
            # print(project_folder)
            with open('innovators.csv', 'a', newline = '') as csv_file:
                writer=csv.writer(csv_file)
                writer.writerow([project_folder, 'null'])
