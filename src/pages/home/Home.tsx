import { Link } from 'react-router-dom'
import { Card, Button } from '../../components'

const Home = () => {
    return (
        <section className="font-poppins flex-auto flex justify-center -mt-16">
            <Card titleCentered title="Welcome to my Quiz app">
                <Link to="/quiz" className="text-center block mt-10">
                    <Button variant="primary">Start a new Quiz</Button>
                </Link>
            </Card>
        </section>
    )
}

export default Home
