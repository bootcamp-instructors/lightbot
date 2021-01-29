import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'

const ModalExample = ({ levelInfo, modal, toggle, redo, className }) => {

    const currSection = sections.find(section => section.id === levelInfo.section_id)
    const currLevel = levels.find(level => level.id === levelInfo.id)

    const nextLevelPath = () => {
        if (currLevel.id + 1 < levels.length) {
            let nextLevel = levels[currLevel.id + 1]
            let nextSection = sections.find(s => s.id === nextLevel.section_id)
            return `/level/${nextSection.name}/${nextLevel.level_id}`
        }
        return "/"
    }

    const nextLevelAvaliable = nextLevelPath()

    const history = useHistory()

    const nextLevel = () => {
        toggle()
        redo()
        history.push(nextLevelAvaliable)
    }
    const redoLevel = () => {
        toggle()
        redo()
    }

    const generalText = <>You have completed {currSection.name} level {currLevel.level_id}!</>
    // onto the next level / good job with this section, onto the next section / you have completed the game!
    const nextText = <>{nextLevelAvaliable.length > 1 ? "Continue to the next Level" : "You have finished the game!"}</>

    return (
        <div>
            <Modal isOpen={modal}  className={className}>
                <ModalHeader toggle={toggle}>Success!</ModalHeader>
                <ModalBody>
                    {generalText}{' '}{nextText}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={redoLevel}>Redo Level</Button>{' '}
                    <Button color="primary" onClick={nextLevel}>Continue</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;