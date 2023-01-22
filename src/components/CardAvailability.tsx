import Card from "../lib/@ui/Card";
import Text from '../lib/@ui/typography/Text'

export const CardAvailability = () => (
  <Card>
    <div className="inline-block mr-2">
      <span className="relative flex h-3 w-3">
        <span
          className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
        ></span>
        <span
          className="relative inline-flex rounded-full h-3 w-3 bg-green-500"
        ></span>
      </span>
    </div>
    <Text as="span">
      <strong>I'm available</strong>
    </Text>
    <Text>
      I'm currently available for freelance work. <a href="/contact"
        >Get in touch</a>
    </Text>
  </Card>
)