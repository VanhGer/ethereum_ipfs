# create the nodekey
bootnode -genkey bootnode.key

# generate enode string
bootnode -nodekeyhex <nodekeyhex-from-file> -writeaddress
# output example for this command: 0b6fa1e0cab2f706001436e6e3ff4d22c7d836e88f31071a4d64cf7bb365625308f5f012c0e9a1d705391429cc2da3d144d7389c191849a7a836d3914c263783

# create .env file

# docker build image
docker compose build

#docker compose
docker compose up

## unlock


