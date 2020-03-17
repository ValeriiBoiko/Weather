export const bottomTabsConfig = (sources = []) => {
    if (sources.length === 0) {
        sources = [
            'day',
            'week'
        ]
    }

    return {
        children: [
            {
                component: {
                    id: "screen.DailyForecast",
                    name: "screen.DailyForecast",
                    options: {
                        bottomTab: {
                            icon: sources[0],
                            text: 'Today'
                        },
                        bottomTabs: {
                            drawBehind: true
                        }
                    }
                }
            },
            {
                component: {
                    id: "screen.WeeklyForecast",
                    name: "screen.WeeklyForecast",
                    options: {
                        bottomTab: {
                            icon: sources[1],
                            text: 'Weekly'
                        },
                        bottomTabs: {
                            drawBehind: true
                        }
                    }
                }
            },
            {
                component: {
                    id: "screen.Share",
                    name: "screen.WeeklyForecast",
                    options: {
                        bottomTab: {
                            icon: sources[1],
                            text: 'Share'
                        },
                        bottomTabs: {
                            drawBehind: true
                        }
                    }
                }
            }
        ]
    }
};