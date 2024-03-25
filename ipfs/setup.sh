#generate swarm key
echo -e "/key/swarm/psk/1.0.0/\n/base16/\n`tr -dc 'a-f0-9' < /dev/urandom | head -c64`" > swarm.key

#build my_private_ipfs image
docker build -t my_private_ipfs .

#run docker compose to create 2 ipfs node
docker compose up
