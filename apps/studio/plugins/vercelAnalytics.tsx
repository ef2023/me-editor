import { definePlugin } from 'sanity';
import { Analytics } from '@vercel/analytics/react';

/**
 * Vercel Web Analytics plugin for Sanity Studio
 * This plugin integrates Vercel Analytics to track Studio usage
 */
export const vercelAnalyticsPlugin = definePlugin({
  name: 'vercel-analytics',
  studio: {
    components: {
      layout: (props) => {
        return (
          <>
            {props.renderDefault(props)}
            <Analytics />
          </>
        );
      },
    },
  },
});
