import { Layout } from "antd";

const { Header, Sider, Content, Footer } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>SIDE MENU</Sider>

      <Layout>
        <Header>HEADER</Header>
        <Content style={{ padding: 24 }}>MAIN CONTENT</Content>
        <Footer>FOOTER</Footer>
      </Layout>
    </Layout>
  );
}