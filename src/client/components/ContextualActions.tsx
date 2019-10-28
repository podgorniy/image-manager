import * as React from 'react'
import {inject, observer} from 'mobx-react'
import {IAppState} from '../app-state'
import {ToggleSelectionAll} from './ToggleSelectionAll'
import {TagsList} from './TagsList'
import {ToggleSelectionVisible} from './ToggleSelectionVisible'
import {CollectionsControls} from './CollectionsControls'
import {ShareMediaItem} from './ShareMediaItem'
import './ContextualActions.css'
import {Button, Icon} from 'semantic-ui-react'
import {logout} from '../api'
import {Tagging} from './Tagging'
import {Collections2} from './Collections2'

@inject('appState')
@observer
export class ContextualActions extends React.Component<{} & IAppState, {}> {
    constructor(props) {
        super(props)
    }

    render() {
        const {appState} = this.props
        let itemForIndividualSharingControl = appState.zoomedItem
        if (appState.selectedItems.length === 1 && !itemForIndividualSharingControl) {
            itemForIndividualSharingControl = appState.selectedItems[0]
        }
        return (
            <div className='ContextualActions'>
                <div className='ContextualActions__row'>
                    <Button.Group size='tiny' icon>
                        <Button
                            compact
                            size='tiny'
                            active={appState.sideExpanded}
                            onClick={() => {
                                appState.toggleSide()
                            }}
                        >
                            <Icon className='ToggleMenu' name='bars' />
                        </Button>
                        <Button
                            compact
                            size='tiny'
                            onClick={() => {
                                appState.toggleUploadVisibility(true)
                            }}
                        >
                            Upload
                        </Button>
                        <Button
                            compact
                            size='tiny'
                            onClick={async () => {
                                const logoutSuccess = await logout()
                                if (logoutSuccess) {
                                    appState.setAuthenticated(false)
                                } else {
                                    alert('Failed to logout')
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </Button.Group>
                </div>
                {itemForIndividualSharingControl && (
                    <div className='ContextualActions__row'>
                        <ShareMediaItem mediaItem={itemForIndividualSharingControl} />
                        <div className='clear'></div>
                    </div>
                )}
                <div className='ContextualActions__row'>
                    <ToggleSelectionAll />
                </div>
                {appState.selectedUUIDs.length ? (
                    <div className='ContextualActions__row'>
                        <CollectionsControls />
                    </div>
                ) : null}
                <div className='ContextualActions__row'>{appState.selectedUUIDs.length ? <Tagging /> : null}</div>
                <div className='ContextualActions__row'>
                    <ToggleSelectionVisible />
                </div>
                <div className='ContextualActions__row'>
                    <TagsList />
                </div>
                <div className='ContextualActions__row'>
                    <Collections2 />
                </div>
            </div>
        )
    }
}
