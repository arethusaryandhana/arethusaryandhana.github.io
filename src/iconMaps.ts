import type { FC } from "react";
import type { IconProps } from "./icons-types";
import {
  BriefcaseIcon,
  CDCIcon,
  DockerIcon,
  DotNetIcon,
  EmailIcon,
  GitHubIcon,
  GoIcon,
  KafkaIcon,
  KubernetesIcon,
  LaravelIcon,
  LinkedInIcon,
  MinIOIcon,
  MongoIcon,
  MySQLIcon,
  NodeIcon,
  PentahoIcon,
  PHPIcon,
  PostgresIcon,
  ReactIcon,
  RedisIcon,
  SQLServerIcon,
  TypeScriptIcon,
  VueIcon,
  WebSocketIcon,
} from "./icons";

export const techIcons: Record<string, FC<IconProps>> = {
  React: ReactIcon,
  "Vue.js": VueIcon,
  Vue: VueIcon,
  TypeScript: TypeScriptIcon,
  "Node.js": NodeIcon,
  Node: NodeIcon,
  PHP: PHPIcon,
  Laravel: LaravelIcon,
  ".NET": DotNetIcon,
  Golang: GoIcon,
  Go: GoIcon,
  PostgreSQL: PostgresIcon,
  Postgres: PostgresIcon,
  MySQL: MySQLIcon,
  "SQL Server": SQLServerIcon,
  MongoDB: MongoIcon,
  Redis: RedisIcon,
  Docker: DockerIcon,
  Kubernetes: KubernetesIcon,
  K8s: KubernetesIcon,
  Kafka: KafkaIcon,
  WebSocket: WebSocketIcon,
  MinIO: MinIOIcon,
  CDC: CDCIcon,
  Pentaho: PentahoIcon,
};

export const socialIcons: Record<string, FC<IconProps>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: EmailIcon,
};

export { BriefcaseIcon };
