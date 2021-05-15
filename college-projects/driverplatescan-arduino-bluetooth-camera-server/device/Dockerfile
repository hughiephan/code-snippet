FROM balenalib/raspberrypi3-python

ENV READTHEDOCS True
RUN apt-get update
RUN pip install picamera requests pyserial

COPY . /usr/src/app
WORKDIR /usr/src/app

CMD ["sh","start.sh"]