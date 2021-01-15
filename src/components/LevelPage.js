import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Stage, Layer, Text, Rect, Line } from 'react-konva'
import CodeBlock from './sprites/CodeBlock'
import Cube from './sprites/Cube'
import Robot from './sprites/Robot'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'
import { colors, blockSize } from './constants'
import { v4 as uuidv4 } from 'uuid';

import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from '@react-hook/window-size'


function LevelPage() {

    const { sectionName, levelID } = useParams()
    const section = sections.find(section => section.name === sectionName)

    const foundLevel = levels.find(l => l.section_id === section.id && l.level_id === parseInt(levelID))
    const [robotLocation, setRobotLocation] = useState(foundLevel.renderRobot)
    const [width, height] = useWindowSize()

    const offsetX = width - 480;
    const offsetY = 20;

    // create Level ayers for robot
    const renderLevel = () => {
        const renderedLevel = !!foundLevel ? foundLevel.level_data.map((block, index) => {
            return Array(block.z).fill().map((item, layer) => {
                return (
                    <Cube
                        x={block.x}
                        y={block.y}
                        z={layer}
                        // update block color if robot lights correct block
                        type={block.type}
                        key={layer}
                    />
                )
            })
        }) : []

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
    const memoizedLevel = useMemo(renderLevel, [sectionName, levelID, robotLocation])

    const [activeGridLayer, setActiveGridLayer] = useState(0)
    // create Grid Layers for block placement
    const createGridLayer = props => {
        const mainBlockPlacementGridLines_Horizontal = [];
        const mainBlockPlacementGridLines_Vertical = [];
        const gridWidth = props.cols * blockSize;
        const gridHeight = props.rows * blockSize;

        // horizontal lines
        for (let i = 0; i <= props.rows; i++) {
            mainBlockPlacementGridLines_Horizontal.push(<Line
                strokeWidth={2}
                stroke={"black"}
                points={[
                    offsetX + 0,
                    (props.position * (gridHeight + 110)) + offsetY + i * blockSize,
                    offsetX + gridWidth,
                    (props.position * (gridHeight + 110)) + offsetY + i * blockSize
                ]}
            />)
        }
        // vertical lines
        for (let i = 0; i <= props.cols; i++) {
            mainBlockPlacementGridLines_Vertical.push(<Line
                strokeWidth={2}
                stroke={"black"}
                points={[
                    offsetX + blockSize * i,
                    (props.position * (gridHeight + 110)) + offsetY + 0,
                    offsetX + blockSize * i,
                    (props.position * (gridHeight + 110)) + offsetY + gridHeight
                ]}
            />)
        }
        return (
            <Layer onClick={e => setActiveGridLayer(props.position)}>
                <Rect
                    x={offsetX - 10}
                    y={(props.position * (gridHeight + 110)) + offsetY - 20}
                    width={blockSize + 10}
                    height={gridHeight + 30}
                    cornerRadius={2}
                    fill={props.position === activeGridLayer ? colors.lightYellow : colors.lightGrey} />
                <Rect
                    x={offsetX - 10}
                    y={(props.position * (gridHeight + 110)) + offsetY - 10}
                    width={gridWidth + 20}
                    height={gridHeight + 20}
                    cornerRadius={2}
                    fill={props.position === activeGridLayer ? colors.lightYellow : colors.lightGrey} />
                <Text text={props.title} x={offsetX} y={(props.position * (gridHeight + 110)) + (offsetY / 4)} />
                {mainBlockPlacementGridLines_Horizontal}
                {mainBlockPlacementGridLines_Vertical}
            </Layer>
        )
    }
    const mainGridData = { rows: 3, cols: 4, title: "Main", position: 0 }
    const memoizedMainGrid = useMemo(() => createGridLayer(mainGridData),
        [sectionName, levelID, activeGridLayer, width, height])

    const functionGridData = { rows: 2, cols: 4, title: "Function 1", position: 1 }
    const memoizedFuncGrid = useMemo(() => createGridLayer(functionGridData),
        [sectionName, levelID, activeGridLayer, width, height])
    const [blocks, setBlocks] = useState([])
    const createNewBlock = (e, blockType) => {
        if (blocks.length >= 12) {
            console.log('too many blocks')
            return
        }
        // TODO: broken, need to fix this
        setBlocks(prevBlocks => {
            // calculate location for next block
            const areaType = activeGridLayer
            const x = offsetX + ((prevBlocks.length % 4) * blockSize)
            const y = offsetY + (Math.floor(prevBlocks.length / 4) * blockSize)
            const id = uuidv4()
            const order = prevBlocks.length
            const newBlock = { id, x, y, blockType, areaType, order }
            console.log("creating new block id:", newBlock)
            return [...prevBlocks, newBlock]
        })
    }
    const createBlockSelection = (available_blocks) => {
        const blockSelection = available_blocks.map((block, index) => {
            return (
                <Rect
                    onClick={e => createNewBlock(e, block)}
                    x={blockSize * index}
                    y={450}
                    width={blockSize}
                    height={blockSize}
                    fill={colors.grey}
                    strokeWidth={2}
                    stroke={"black"}
                />
            )
        })

        return (
            <Layer>
                {blockSelection.length > 0 ?
                    blockSelection
                    : <Text text="No Blocks found for this level" />
                }
            </Layer>
        )
    }
    const memoizedBlockSelection = useMemo(() => createBlockSelection(foundLevel.available_blocks), [foundLevel.available_blocks])

    // block related
    const updateBlockLocation = (e, id, newX, newY) => {
        const [items, item, index] = findBlock(e, id)
        items[index] = {
            ...item,
            x: newX,
            y: newY
        };
        setBlocks(items)
    }

    // block related
    const findBlock = (e, id) => {
        const items = [...blocks]
        const item = items.find(i => i.id === id)
        const index = items.indexOf(item)
        return [items, item, index]
    }

    // block related
    const deleteSelf = (e, id) => {
        console.log("running deleteSelf on id:", id)
        const newBlocks = blocks.filter(obj => {
            return obj.id !== id;
        })
        setBlocks(newBlocks)
    }
    // board related
    const organizeBoard = () => {
        // confirm all blocks fit in screen correctly
        console.log("running organizeBoard")
    }
    // block related
    // TODO: fix this 
    // this function should bring any currently dragging element and put it on top
    const handleDragStart = (e, id) => {
        // const [items, item, index] = findBlock(e, id)
        // // remove from the list:
        // items.splice(index, 1)
        // // add to the top
        // items.push(item)
        // setBlocks(items)
    };

    const handleDragEnd = (e, id) => {
        // this code needs to be finished to update the blocks array when the drop happens
        // updateBlockLocation(e, id, e.target.x(), e.target.y())
        calculateDropLocation(e, id)
    }


    // block related
    const calculateDropLocation = (e, id) => {

        // on every pick up of block, organize board
        organizeBoard()

        console.log("running calculateDropLocation on id:", id)

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
            const lastBlockX = ((blocks.length - 1) % 4) * blockSize + offsetX
            const lastBlockY = Math.floor((blocks.length - 1) / 4) * blockSize + offsetY
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
    // board related
    const resetBoard = (e) => {
        setBlocks([])
    }
    // board related
    const runCode = e => {
        console.log("running code")
    }

    return (
        <div className="p-2">

            <Stage width={width - 200} height={height - 100}>
                {memoizedLevel}
                {memoizedMainGrid}
                {foundLevel.section_id > 0 && memoizedFuncGrid}
                {memoizedBlockSelection}


                {/* drag and drop blocks layer */}
                <Layer>
                    {blocks.map((b, i) => <CodeBlock
                        {...b}
                        i={i}
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
                        onClick={runCode}
                        x={blockSize * 1}
                        y={450 - blockSize - 10}
                        width={blockSize}
                        height={blockSize}
                        fill="green"
                    />
                </Layer>
            </Stage>
        </div>
    )
}

export default LevelPage
