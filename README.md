# superKluster.com
> Nextjs project


## Deploy

Send the image to the repository
```
# Create the image and tag it
docker build . -trepo.treescale.com/humbkr/superkluster_com:<TAG>

# Test
docker run -i -pXXXX:3000 repo.treescale.com/humbkr/superkluster_com:1.0.0

# Push it to the treescale docker repository
docker push repo.treescale.com/humbkr/superkluster_com:<TAG>
```

SSH into the prod server and launch the image using docker-compose
```
ssh <SERVER>
cp <PROJECT_ROOT>

# Edit docker-compose.yml file and change tag image
vi docker-compose.yml

# Launch the image
docker-compose up -d
```
