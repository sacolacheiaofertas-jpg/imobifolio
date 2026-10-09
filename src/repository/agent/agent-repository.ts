import { CollectionSlug } from "payload"
import { Agent } from "@/payload-types"
import { BaseRepository } from "../base-repository"

export class AgentRepository extends BaseRepository<Agent, AgentDecorator> {
  override collection: CollectionSlug = "agents"
  override DecoratorClass = AgentDecorator
  email!: Agent["email"]
}

export class AgentDecorator {}
