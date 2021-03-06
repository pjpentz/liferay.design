import { Flex, Heading, Text } from 'components/atoms'
import React, { Component } from 'react'

import Day from './Day'
import Talk from './Talk'
import classes from './Agenda.scss'
import moment from 'moment'
import scheduleArray from './schedule'

export class Agenda extends Component {
	constructor() {
		super()

		this.state = {
			currentAgenda: scheduleArray[0],
			currentDay: this.getDate(scheduleArray[0].day),
			nextDay: this.getDate(scheduleArray[1].day),
		}

		this.toggleDay = this.toggleDay.bind(this)
	}
	getDate(date) {
		return moment(date, 'MM-DD-YYYY')
	}
	getNextDay(index) {
		if (index < scheduleArray.length - 1) {
			const nextIndex = index + 1
			return this.getDate(scheduleArray[nextIndex].day)
		}
		return null
	}
	getPreviousDay(index) {
		if (index > 0) {
			const previousIndex = index - 1
			return this.getDate(scheduleArray[previousIndex].day)
		}
		return null
	}
	toggleDay(toggleDirection) {
		const currentIndex = this.state.currentAgenda.id
		const scheduleLength = scheduleArray.length - 1

		let updatedIndex

		if (toggleDirection === 'previous') {
			updatedIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
		} else {
			updatedIndex = currentIndex < scheduleLength ? currentIndex + 1 : currentIndex
		}

		this.setState({
			currentAgenda: scheduleArray[updatedIndex],
			currentDay: this.getDate(scheduleArray[updatedIndex].day),
			nextDay: this.getNextDay(updatedIndex),
			previousDay: this.getPreviousDay(updatedIndex),
		})
	}
	render() {
		const { currentDay, nextDay, previousDay } = this.state

		return (
			<div className={classes.agendaContainer} id="agenda">
				<Flex className={classes.heading} justify="flex-start" width="100%">
					<Heading level={2} bottomBorder>
						Agenda
					</Heading>

					<Text type="p" color="grey">
						The first Design Week at Liferay features a variety of sessions that will
						give insights into what the teams in each region are working on, as well as
						provide a foundation for increased collaboration.
					</Text>
				</Flex>

				<Flex justify="space-between">
					<Day day={previousDay} onClick={() => this.toggleDay('previous')} previous />

					<div className={classes.schedule}>
						<Day current day={currentDay} />

						{this.state.currentAgenda.talks.map((data, i) => (
							<Talk data={data} key={i} />
						))}
					</div>

					<Day day={nextDay} onClick={() => this.toggleDay('next')} />
				</Flex>
			</div>
		)
	}
}

export default Agenda
