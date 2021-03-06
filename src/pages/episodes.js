import React from 'react'
import Layout from '../components/layout';
import NewButton from '../components/newButton';
import {Link} from 'react-router-dom';
import envConfig from "../envConfig";
import IndexPreview from "../components/indexPreview";
import IndexPreviewContainer from "../components/indexPreviewContainer";
import Spinner from '../components/spinner';

export default class Episodes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      episodes: null
    }
  }

  async componentWillMount() {
    let x = await fetch(`${envConfig.API_HOST}/api/episodes`)
    let j = await x.json();

    this.setState({
      episodes: j
    })
  }

  render() {
    return (
      <Layout title="All Episodes">
        <IndexPreviewContainer>
          <IndexPreview>
            <h2>New Episode</h2>
            <NewButton to="episode/new"></NewButton>
          </IndexPreview>
          {this.state.episodes 
            ? this.state.episodes.map((episode) => (
              <IndexPreview>
                <h2>{episode.title}</h2>
                <Link to={`/episode/${episode.id}`}>
                  Edit Episode info
                </Link>
              </IndexPreview>
            ))
            : <Spinner></Spinner>}
        </IndexPreviewContainer>
      </Layout>
    )  
  }
}
