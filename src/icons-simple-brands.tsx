import type { IconProps } from "./icons-types";
import {
  siApachekafka,
  siDocker,
  siDotnet,
  siGo,
  siKubernetes,
  siLaravel,
  siMinio,
  siMongodb,
  siMysql,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siRedis,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

function BrandIcon({
  icon,
  className = "",
  size = 24,
  color,
}: IconProps & { icon: SimpleIcon; color?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color: color ?? `#${icon.hex}` }}
      role="img"
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

export function ReactIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siReact} />;
}

export function TypeScriptIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siTypescript} />;
}

export function NodeIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siNodedotjs} />;
}

export function PostgresIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siPostgresql} />;
}

export function DockerIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siDocker} />;
}

export function VueIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siVuedotjs} />;
}

export function MongoIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siMongodb} />;
}

export function MySQLIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siMysql} />;
}

export function PHPIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siPhp} />;
}

export function LaravelIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siLaravel} />;
}

export function DotNetIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siDotnet} />;
}

export function GoIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siGo} />;
}

export function RedisIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siRedis} />;
}

export function KafkaIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siApachekafka} color="#f5f5f7" />;
}

export function MinIOIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siMinio} />;
}

export function KubernetesIcon(props: IconProps) {
  return <BrandIcon {...props} icon={siKubernetes} />;
}
