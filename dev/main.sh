usage="
Script usage:
  scripts/main.sh [--dev=DEV_LETTERS] {up|down|stop|other docker-compose cmd}

DEV_LETTERS:
  a - all: all services in dev mode
Examples:
  main.sh up // all container in prod mode

  // start certain containers in dev mode
  main.sh --dev=a up // all services in dev mode
  ----
"

cd "$(dirname "$0")"

if [[ -z $@ ]]; then
    echo "$usage"
fi

ARGS=()
dev=''
for i in "$@"
do
    if [[ $i == "--dev="* ]]
    then
        dev="${i#*=}"
        shift
    else
        ARGS+=("$i")
    fi
done

prod_compose="-f ../docker-compose.yml"

dev_compose=()

for l in $(echo ${dev} | grep -o .)
do
    case $l in
        a)
            echo "DEV services : services"
            dev_compose+=" -f ../dev/dev-all.yml"
        ;;
    esac
done

docker-compose ${prod_compose} ${dev_compose} "${ARGS[@]}"
