import { Layout } from 'antd';
import './styles/App.css';

function App() {
  const { Header, Sider, Menu, Content, Footer } = Layout;

  return (
    <Layout>
      <Header className="header">
        <h1> waw </h1>
      </Header>

      <Layout>
        <Sider className="sider">
          <Menu />
        </Sider>
        <Content>
          <h2> content! </h2>
        </Content>
      </Layout>

      <Footer className="footer">
        <p> copyright by me©, 2025 </p>
      </Footer>
    </Layout>
  );
}

export default App;
