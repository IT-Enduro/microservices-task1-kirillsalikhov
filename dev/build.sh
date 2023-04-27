cd "$(dirname "$0")"

docker build ../shared-libs/ -t cinema-services-base:latest
