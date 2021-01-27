import { useState, useMemo, Fragment } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Stage, Layer, Text, Rect, Line } from 'react-konva'
import CodeBlock from './sprites/CodeBlock'
import Cube from './sprites/Cube'
import Robot from './sprites/Robot'
import Modal from './Modal'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'
import { colors, blockSize, moveTypes, blockTypes } from '../data'
import { v4 as uuidv4 } from 'uuid';
import { useWindowSize } from '@react-hook/window-size'
import ForwardBlock from './sprites/ForwardBlock'
import LeftBlock from './sprites/LeftBlock'
import RightBlock from './sprites/RightBlock'
import LightBlock from './sprites/LightBlock'
import SpringBlock from './sprites/SpringBlock'

function Game() {

    // TODO: abstract each component to a new file
    // modal related
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const { sectionName, levelID } = useParams()
    const section = sections.find(section => section.name === sectionName)
    const foundLevel = !!section
        ? levels.find(l => l.section_id === section.id && l.level_id === parseInt(levelID))
        : undefined
    const legalLevel = !!section && !!foundLevel
    const [levelData, setLevelData] = useState(!!foundLevel ? foundLevel.level_data : [])
    const resetLevel = () => setLevelData(p => {
        // TODO: bug - on reset game, the colors dont go back to blue for the light tiles
        // TODO: bug - on redo or continue in modal, the board does not re render and the blocks stay in the code pen
        const correctData = !!foundLevel ? foundLevel.level_data : []
        return [...correctData]
    })
    const [robotLocation, setRobotLocation] = useState(!!foundLevel ? foundLevel.renderRobot : {})
    const [width, height] = useWindowSize()
    const resetRobot = () => setRobotLocation(!!foundLevel ? foundLevel.renderRobot : {})
    const offsetX = width - 480;
    const offsetY = 20;
    const [timeInterval, setTimeInterval] = useState(500)
    const updateTimeInterval = () => setTimeInterval(pTime => pTime === 500 ? 250 : 500)
    // create Level layers for robot
    const renderLevel = () => {
        const renderedLevel = levelData.map((block, index) => {
            return Array(block.z).fill().map((item, layer) => {
                return (
                    <Cube
                        {...block}
                        x={block.x}
                        y={block.y}
                        z={layer}
                        // update block color if robot lights correct block
                        type={block.type}

                        key={`${index}-${layer}`}
                    />
                )
            })
        })
        return (
            <Layer>
                {/* robot level layer */}
                {renderedLevel.length > 0 ?
                    <>
                        {renderedLevel}
                        <Robot {...robotLocation} />
                    </>
                    : <Text text="Level not found" />
                }
            </Layer>
        )
    }
    const memoizedLevel = useMemo(renderLevel, [robotLocation, levelData])
    const [activeGridLayer, setActiveGridLayer] = useState(0)
    // create Grid Layers for block placement
    const createGridLayer = ({ rows, cols, title, position }) => {
        const mainBlockPlacementGridLines_Horizontal = [];
        const mainBlockPlacementGridLines_Vertical = [];
        const gridWidth = cols * blockSize;
        const gridHeight = rows * blockSize;

        // horizontal lines
        for (let i = 0; i <= rows; i++) {
            mainBlockPlacementGridLines_Horizontal.push(<Line
                strokeWidth={2}
                stroke={"black"}
                key={i}
                points={[
                    offsetX + 0,
                    (position * (gridHeight + 110)) + offsetY + i * blockSize,
                    offsetX + gridWidth,
                    (position * (gridHeight + 110)) + offsetY + i * blockSize
                ]}
            />)
        }
        // vertical lines
        for (let i = 0; i <= cols; i++) {
            mainBlockPlacementGridLines_Vertical.push(<Line
                strokeWidth={2}
                key={i}
                stroke={"black"}
                points={[
                    offsetX + blockSize * i,
                    (position * (gridHeight + 110)) + offsetY + 0,
                    offsetX + blockSize * i,
                    (position * (gridHeight + 110)) + offsetY + gridHeight
                ]}
            />)
        }
        return (
            <Layer onClick={e => setActiveGridLayer(position)}>
                <Rect
                    x={offsetX - 10}
                    y={(position * (gridHeight + 110)) + offsetY - 20}
                    width={blockSize + 10}
                    height={gridHeight + 30}
                    cornerRadius={2}
                    fill={position === activeGridLayer ? colors.lightYellow : colors.lightGrey} />
                <Rect
                    x={offsetX - 10}
                    y={(position * (gridHeight + 110)) + offsetY - 10}
                    width={gridWidth + 20}
                    height={gridHeight + 20}
                    cornerRadius={2}
                    fill={position === activeGridLayer ? colors.lightYellow : colors.lightGrey} />
                <Text text={title} x={offsetX} y={(position * (gridHeight + 110)) + (offsetY / 4)} />
                {mainBlockPlacementGridLines_Horizontal}
                {mainBlockPlacementGridLines_Vertical}
            </Layer>
        )
    }
    const memoizedMainGrid = useMemo(() => createGridLayer({ rows: 3, cols: 4, title: "Main", position: 0 }), [activeGridLayer])

    const memoizedFuncGrid = useMemo(() => createGridLayer({ rows: 2, cols: 4, title: "Function 1", position: 1 }), [activeGridLayer])
    const [mainBlocks, setMainBlocks] = useState([])
    const [func1Blocks, setFunc1Blocks] = useState([])
    // block related
    const createNewBlock = (e, blockType) => {
        resetRobot()
        resetLevel()
        // TODO: broken, need to fix this
        //  TODO: add func 1 blocks
        if (activeGridLayer === 0) {
            setMainBlocks(prevMainBlocks => {
                if (prevMainBlocks.length >= 12) {
                    console.log('too many blocks')
                    return prevMainBlocks
                }
                // calculate location for next block
                const areaType = activeGridLayer
                const i = (prevMainBlocks.length % 4)
                const j = Math.floor(prevMainBlocks.length / 4)
                const id = uuidv4()
                const order = prevMainBlocks.length
                const newBlock = { id, i, j, blockType, areaType, order }
                return [...prevMainBlocks, newBlock]
            })
        }
        else if (activeGridLayer === 1) {
            setFunc1Blocks(prevFunc1Blocks => {
                if (prevFunc1Blocks.length >= 12) {
                    console.log('too many blocks')
                    return prevFunc1Blocks
                }
                // calculate location for next block
                const areaType = activeGridLayer
                const i = (prevFunc1Blocks.length % 4)
                const j = Math.floor(prevFunc1Blocks.length / 4)
                const id = uuidv4()
                const order = prevFunc1Blocks.length
                const newBlock = { id, i, j, blockType, areaType, order }
                return [...prevFunc1Blocks, newBlock]
            })
        }
    }
    // block x,y,i,j calculation
    const calcX = (i) => offsetX + (i * blockSize)
    const calcY = (j,p) => offsetY + (j * blockSize) + (p * j + 110)
    const calcI = (x) => (x - offsetX) / blockSize
    const calcJ = (y,p) => (y - offsetY) / blockSize + (p * j+ 110)
    const Y_Block_selectOffsetRename = 450
    const createMoveSelection = (available_moves) => {
        const moveSelection = available_moves.map((move, index) => {
            return (
                <Fragment key={index}>
                    <Rect
                        onClick={e => createNewBlock(e, move)}
                        x={blockSize * index}
                        y={Y_Block_selectOffsetRename}
                        width={blockSize}
                        height={blockSize}
                        fill={colors.grey}
                        strokeWidth={2}
                        stroke={"black"}
                    // handleDragStart={e=>createNewBlockInMotion(e, block)}
                    // handleDragEnd={e=>handleDragEnd(e,)}
                    />
                    {move === 'forward' && <ForwardBlock
                        clickFunc={e => createNewBlock(e, move)}
                        x={blockSize * index}
                        y={Y_Block_selectOffsetRename}
                    />}
                    {move === 'left' && <LeftBlock
                        clickFunc={e => createNewBlock(e, move)}
                        x={blockSize * index}
                        y={Y_Block_selectOffsetRename}
                    />}
                    {move === 'right' && <RightBlock
                        clickFunc={e => createNewBlock(e, move)}
                        x={blockSize * index}
                        y={Y_Block_selectOffsetRename}
                    />}
                    {move === 'light' && <LightBlock
                        clickFunc={e => createNewBlock(e, move)}
                        x={blockSize * index}
                        y={Y_Block_selectOffsetRename}
                    />}
                    {move === 'jump' && <SpringBlock
                        clickFunc={e => createNewBlock(e, move)}
                        x={blockSize * index}
                        y={Y_Block_selectOffsetRename}
                    />}
                    {move === 'f1' && <Text
                        fontSize={35}
                        onClick={e => createNewBlock(e, move)}
                        x={blockSize * index + 15}
                        y={Y_Block_selectOffsetRename + 20}
                        text={'F1'}
                    />}
                    {move === 'f2' && <Text
                        fontSize={35}
                        onClick={e => createNewBlock(e, move)}
                        x={blockSize * index + 15}
                        y={Y_Block_selectOffsetRename + 20}
                        text={'F2'}
                    />}
                </Fragment>
            )
        })

        return (
            <Layer>
                {moveSelection.length > 0 ?
                    moveSelection
                    : <Text text="No Blocks found for this level" />
                }
            </Layer>
        )
    }
    const memoizedMoveSelection = useMemo(() => createMoveSelection(!!foundLevel ? foundLevel.available_moves : []), [sectionName, levelID])
    // drag block related
    const updateBlockLocation = (e, id, newX, newY) => {
        const [items, item, index] = findBlock(e, id)
        items[index] = {
            ...item,
            i: calcI(newX),
            j: calcJ(newY)
        };
        setMainBlocks(prev => items)
    }
    // drag block related
    const handleDragStart = (e, id) => {
        // TODO: this function should bring any currently dragging element and put it on top
        // const [items, item, index] = findBlock(e, id)
        // // remove from the list:
        // items.splice(index, 1)
        // // add to the top
        // items.push(item)
        // setMainBlocks(items)


        // on every pick up of block, organize board
        organizeBoard(e, id)
    }
    // drag block related
    const handleDragEnd = (e, id) => {
        // this code needs to be finished to update the blocks array when the drop happens
        // updateBlockLocation(e, id, e.target.x(), e.target.y())
        calculateDropLocation(e, id)
    }
    // drag block related
    const calculateDropLocation = (e, id) => {
        const mainBounds = {
            left: offsetX,
            right: offsetX + (blockSize * 4),
            top: offsetY,
            bottom: offsetY + (blockSize * 3)
        }
        const funcBounds = {
            left: offsetX,
            right: offsetX + (blockSize * 4),
            top: offsetY,
            bottom: offsetY + (blockSize * 3)
        }

        const dropX = (offsetX % 68) + Math.round(e.target.x() / blockSize) * blockSize
        const dropY = offsetY + Math.round(e.target.y() / blockSize) * blockSize

        // if drop location is out of bounds
        if (((dropY + (blockSize / 2)) < mainBounds.top) ||
            (dropY > (mainBounds.bottom + (blockSize / 2))) ||
            ((dropX + (blockSize / 2)) < mainBounds.left) ||
            (dropX > (mainBounds.right + (blockSize / 2)))
        ) {
            deleteSelf(e, id)
        }
        else {
            // move block to new location

            // if hover over no blocks, place block at the end of all the blocks
            const lastBlockX = ((mainBlocks.length - 1) % 4) * blockSize + offsetX
            const lastBlockY = Math.floor((mainBlocks.length - 1) / 4) * blockSize + offsetY
            e.target.to({
                x: lastBlockX,
                y: lastBlockY
            });
            updateBlockLocation(e, id, lastBlockX, lastBlockY)

            // if hover over existing block, replace block 
            // if hover in between existing blocks, place in between and move all blocks on the right, to the left
            // e.target.to({
            //     x: dropX,
            //     y: dropY
            // });
        }
    }
    // block related
    const findBlock = (e, id) => {
        const items = [...mainBlocks]
        const item = items.find(i => i.id === id)
        const index = items.indexOf(item)
        return [items, item, index]
    }
    // block related
    const deleteSelf = (e, id) => {
        resetRobot()
        resetLevel()
        organizeBoard(e, id)
        if (activeGridLayer === 0) {
            setMainBlocks(prevBlocks => prevBlocks.filter(obj => obj.id !== id))
        }
        else if (activeGridLayer === 1) {
            setFunc1Blocks(prevBlocks => prevBlocks.filter(obj => obj.id !== id))
        }
    }
    // board related
    const organizeBoard = (e, id) => {
        // confirm all blocks fit in screen correctly
        if (activeGridLayer === 0) {
            setMainBlocks(prevBlocks => {
                const currentBlock = prevBlocks.find(b => b.id === id)
                let newBlockArray = []
                let foundBlock = false
                for (let b of prevBlocks) {
                    let newBlock = { ...b }
                    if (currentBlock.i === b.i && currentBlock.j === b.j) {
                        foundBlock = true
                        // dont do anything here
                        newBlockArray.push(newBlock)
                    }
                    else if (foundBlock) {
                        // shift blocks
                        if (newBlock.i === 0) {
                            newBlock.i = 3
                            if (newBlock.j !== 0) {
                                newBlock.j--
                            }
                        }
                        else {
                            newBlock.i--
                        }
                        newBlockArray.push(newBlock)
                    }
                    else {
                        // have not found block yet
                        newBlockArray.push(newBlock)
                    }
                }
                return newBlockArray.sort((b1, b2) => b1.j - b2.j || b1.i - b2.i)

            })
        }
        else if (activeGridLayer === 1) {
            setFunc1Blocks(prevBlocks => {
                const currentBlock = prevBlocks.find(b => b.id === id)
                let newBlockArray = []
                let foundBlock = false
                for (let b of prevBlocks) {
                    let newBlock = { ...b }
                    if (currentBlock.i === b.i && currentBlock.j === b.j) {
                        foundBlock = true
                        // dont do anything here
                        newBlockArray.push(newBlock)
                    }
                    else if (foundBlock) {
                        // shift blocks
                        if (newBlock.i === 0) {
                            newBlock.i = 3
                            if (newBlock.j !== 0) {
                                newBlock.j--
                            }
                        }
                        else {
                            newBlock.i--
                        }
                        newBlockArray.push(newBlock)
                    }
                    else {
                        // have not found block yet
                        newBlockArray.push(newBlock)
                    }
                }
                return newBlockArray.sort((b1, b2) => b1.j - b2.j || b1.i - b2.i)
            })
        }
    }
    // board related
    const resetBoard = (e) => {
        resetRobot()
        resetLevel()
        setMainBlocks(prev => [])
        setFunc1Blocks(prev => [])
    }
    // board related
    const undoMove = (e) => {
        resetRobot()
        resetLevel()
        if (activeGridLayer === 0) {
            setMainBlocks(prevBlocks => {
                let newBlocks = [...prevBlocks]
                newBlocks.pop()
                return newBlocks
            })
        }
        else if (activeGridLayer === 1) {
            setFunc1Blocks(prevBlocks => {
                let newBlocks = [...prevBlocks]
                newBlocks.pop()
                return newBlocks
            })
        }
    }
    // robot related
    const isLightable = ({ x, y, z }) => {
        const currBlockIndex = levelData.findIndex(b => {
            if (b.x === x && b.y === y && b.z === z) {
                return b
            }
        })
        if (levelData[currBlockIndex].type === moveTypes[1]) {
            return currBlockIndex
        }
        return -1
    }
    // robot related
    const canJump = ({ x, y, z }) => {
        if (inRange({ x, y, z: z + 1 })) {
            return 1
        }
        if (inRange({ x, y, z: z - 1 })) {
            return -1
        }
        return 0
    }
    // robot related
    const inRange = ({ x, y, z }) => {
        // iterate through blocks and confirm newLocation is legal)
        for (let block of levelData) {
            if (block.x === x && block.y === y && block.z === z) {
                return true
            }
        }
        return false
    }
    const redo = (e) => {
        resetRobot()
        setMainBlocks(prev => [])
        setFunc1Blocks(prev => [])
        resetLevel()
        toggleModal()
    }
    // robot related
    const updateRobotlocation = (block) => {
        // TODO: finish this code
        setRobotLocation(prevLocation => {
            let currRobot = { ...prevLocation }//{ y 0, y: 0, z: 1, angle: 0 }
            // on turn, update angle to face right
            if (block.blockType === moveTypes[3]) {
                switch (currRobot.angle) {
                    case 0:
                        currRobot.angle = 120
                        break
                    case 120:
                        currRobot.angle = 180
                        break
                    case 180:
                        currRobot.angle = 300
                        break
                    case 300:
                        currRobot.angle = 0
                        break
                }
            }
            // on turn, update angle to face left
            if (block.blockType === moveTypes[2]) {
                switch (currRobot.angle) {
                    case 0:
                        currRobot.angle = 300
                        break
                    case 120:
                        currRobot.angle = 0
                        break
                    case 180:
                        currRobot.angle = 120
                        break
                    case 300:
                        currRobot.angle = 180
                        break
                }
            }
            // on forward, update x or y based on angle
            if (block.blockType === moveTypes[0]) {
                // check if robot can indeed move forward here
                if (currRobot.angle === 0 && inRange({ x: currRobot.x + 1, y: currRobot.y, z: currRobot.z })) {
                    currRobot.x++
                }
                if (currRobot.angle === 120 && inRange({ x: currRobot.x, y: currRobot.y - 1, z: currRobot.z })) {
                    currRobot.y--
                }
                if (currRobot.angle === 180 && inRange({ x: currRobot.x - 1, y: currRobot.y, z: currRobot.z })) {
                    currRobot.x--
                }
                if (currRobot.angle === 300 && inRange({ x: currRobot.x, y: currRobot.y + 1, z: currRobot.z })) {
                    currRobot.y++
                }
            }
            // on jump, update z and x or y based on angle and jumpable location
            if (block.blockType === moveTypes[4]) {
                // check if robot can indeed move forward and jump up or down here

                if (currRobot.angle === 0) {
                    let jump = canJump({ x: currRobot.x + 1, y: currRobot.y, z: currRobot.z })
                    if (jump !== 0) {
                        currRobot.x++
                        currRobot.z += jump
                    }
                }
                if (currRobot.angle === 120) {
                    let jump = canJump({ x: currRobot.x, y: currRobot.y - 1, z: currRobot.z })
                    if (jump !== 0) {
                        currRobot.y--
                        currRobot.z += jump
                    }
                }
                if (currRobot.angle === 180) {
                    let jump = canJump({ x: currRobot.x - 1, y: currRobot.y, z: currRobot.z })
                    if (jump !== 0) {
                        currRobot.x--
                        currRobot.z += jump
                    }
                }
                if (currRobot.angle === 300) {
                    let jump = canJump({ x: currRobot.x, y: currRobot.y + 1, z: currRobot.z })
                    if (jump !== 0) {
                        currRobot.y++
                        currRobot.z += jump
                    }
                }
            }
            // on light, toggle powered value
            if (block.blockType === moveTypes[1]) {
                let index = isLightable({ x: currRobot.x, y: currRobot.y, z: currRobot.z })
                if (index >= 0) {
                    setLevelData(prevLevelData => {
                        let newLevelData = [...prevLevelData]
                        newLevelData[index].powered = !newLevelData[index].powered
                        return newLevelData
                    })
                }
            }
            return currRobot
        })
    }
    const checkSolution = () => {
        for (let block of levelData) {
            if (block.type === blockTypes[1]) {
                if (!block.powered) {
                    return false
                }
            }
        }
        // if we arrived here, the player has solved the level
        // pop up modal, telling user that the player has successfully completed the level, to move on to the next level or to redo level
        toggleModal()
        // ask the user if they can refactor their solution to use less blocks if they used more than min needed
        return true
    }
    // board related
    const runPlayerCode = e => {
        resetRobot()
        resetLevel()
        let i = 0
        let checkingGame = setInterval(() => {
            if (mainBlocks.length > 0) {
                updateRobotlocation(mainBlocks[i])
                i++
                if (checkSolution() || i >= mainBlocks.length) {
                    clearInterval(checkingGame);
                }
            }
        }, timeInterval)
    }
    return (
        <div className="p-2">
            {legalLevel ?
                <>
                    <Stage width={width - 200} height={height - 100}>
                        {memoizedLevel}
                        {memoizedMainGrid}
                        {foundLevel.section_id > 0 && memoizedFuncGrid}
                        {memoizedMoveSelection}
                        {/* drag and drop blocks layer */}
                        <Layer>
                            {mainBlocks.map((b, index) => <CodeBlock
                                {...b}
                                x={calcX(b.i)}
                                y={calcY(b.j)}
                                key={index}
                                index={index}
                                deleteSelf={deleteSelf}
                                calculateDropLocation={calculateDropLocation}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                            />
                            )}
                            {func1Blocks.map((b, index) => <CodeBlock
                                {...b}
                                x={calcX(b.i)}
                                y={calcY(b.j)}
                                key={index}
                                index={index}
                                deleteSelf={deleteSelf}
                                calculateDropLocation={calculateDropLocation}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                            />
                            )}
                            <Rect
                                onClick={resetBoard}
                                x={blockSize * 0}
                                y={450 - blockSize - 10}
                                width={blockSize}
                                height={blockSize}
                                fill="red"
                            />
                            <Rect
                                onClick={undoMove}
                                x={blockSize * 1}
                                y={450 - blockSize - 10}
                                width={blockSize}
                                height={blockSize}
                                fill="yellow"
                            />
                            <Rect
                                onClick={runPlayerCode}
                                x={blockSize * 2}
                                y={450 - blockSize - 10}
                                width={blockSize}
                                height={blockSize}
                                fill="green"
                            />
                            <Rect
                                onClick={updateTimeInterval}
                                x={blockSize * 3}
                                y={450 - blockSize - 10}
                                width={blockSize}
                                height={blockSize}
                                fill="purple"
                            />
                        </Layer>
                    </Stage>
                    <Modal modal={modal} toggle={toggleModal} redo={redo} levelInfo={foundLevel} />
                </>
                : <Redirect to='/' />}
        </div>
    )
}

export default Game