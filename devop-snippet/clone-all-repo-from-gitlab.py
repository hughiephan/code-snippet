from urllib.request import urlopen
import json
import subprocess, shlex

for i in range(17):
    allProjects     = urlopen("https://[personal-gitlab-domain-here]/api/v4/projects?private_token=[token-here]&page=" + str(i) + "&per_page=100000")

    allProjectsDict = json.loads(allProjects.read().decode())
    for thisProject in allProjectsDict:
        try:
            # print(thisProject)
            thisProjectURL  = thisProject['http_url_to_repo']
            command     = shlex.split('git clone %s' % thisProjectURL)
            resultCode  = subprocess.Popen(command)

        except Exception as e:
            print("Error on %s: %s" % (thisProjectURL, e.strerror))
