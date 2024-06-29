import Title from "@/components/site/common/title";
import List from "./list";
import Wrapper from "@/components/site/common/wrapper";
import Hero from "./hero";

export default function Workspaces() {
  return (
    <Wrapper className="space-y-4">
      {/* <Hero /> */}
      <Title>Workspaces that inspire</Title>
      <List />
    </Wrapper>
  );
}
