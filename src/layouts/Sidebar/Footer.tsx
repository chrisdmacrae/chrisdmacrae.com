import { CardAvailability } from "../../components/CardAvailability"
import { Link } from "./Link"

export const Footer: React.FC = () => (
  <div className="mt-auto flex flex-col gap-4">
    <CardAvailability />
    <Link href="/about">
      More about Chris
    </Link>
  </div>
)