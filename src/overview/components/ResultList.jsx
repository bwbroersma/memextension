import React from 'react'

import WebPageAsListItem from './WebPageAsListItem'
import { makeRangeTransform, makeNonlinearTransform } from '../../util/make-range-transform'

// Map a time duration between log entries to a number of pixels between them.
const timeGapToSpaceGap = makeNonlinearTransform({
    // A gap of <5 mins gets no extra space, a >24 hours gap gets the maximum space.
    domain: [60*5, 60*60*24],
    // Minimum and maximum added space, in pixels.
    range: [0, 100],
    // Clamp excessive values to stay within the output range.
    clampOutput: true,
    // Use a logarithm to squeeze the larger numbers.
    nonlinearity: Math.log,
})
const rowSpacing = (row, nextRow) => nextRow
    ? timeGapToSpaceGap((row.doc.timestamp - nextRow.doc.timestamp)/1000)
    : undefined

const ResultList = ({searchResults}) => (
    <ul className="ResultList">
        {searchResults.map((row, rowIndex) =>
            <li
                key={row.id}
            >
                <WebPageAsListItem
                    doc={row.doc}
                    extraBottomSpace={rowSpacing(row, searchResults[rowIndex+1])}
                />
            </li>
        )}
    </ul>
)

export default ResultList
