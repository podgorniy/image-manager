import * as React from 'react'
import {observer} from 'mobx-react'
import {inject} from 'mobx-react'
import {IAppState} from '../app-state'
import Shuffle from 'shufflejs'
import {MediaListItem} from './MediaListItem'
import {getType, isDev} from '../../common/lib'

@inject('appState')
@observer
export class MediaList extends React.Component<{} & IAppState, {}> {
    listRef = React.createRef<HTMLUListElement>()
    shuffle: any

    componentDidMount(): void {
        const node = this.listRef.current
        if (this.shuffle) {
            // is relevant as we will null value on unmount?
            throw Error('Shuffle already instantiated') // Should never throw
        }
        this.shuffle = new Shuffle(node, {})
        if (isDev()) {
            window['s'] = this.shuffle
        }
    }

    componentWillUnmount(): void {
        this.shuffle.destroy()
        this.shuffle = null
    }

    componentDidUpdate(): void {
        // update due to change of list items should reset items
        // this.shuffle.resetItems()
        // update due to change of layout should just update
        this.shuffle.update()
    }

    render() {
        const {appState} = this.props
        const widthClass = 'media-items-columns-' + appState.columnsCount
        return (
            <ul ref={this.listRef} className={`media-items ${widthClass}`}>
                {appState.media.map(({url, fileName, selected}, i) => {
                    return (
                        <li key={url} className='media-item-wrapper-outer'>
                            <div className={`media-item-wrapper-inner ${selected ? 'selected' : ''}`}>
                                <MediaListItem fileName={fileName} url={url} type={getType(url)} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
