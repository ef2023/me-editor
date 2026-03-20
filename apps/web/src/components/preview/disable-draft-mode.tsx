'use client';

import {useIsPresentationTool} from 'next-sanity/hooks';
import styles from './disable-draft-mode.module.scss';

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) {
    return null;
  }

  return (
    <a href="/api/draft-mode/disable" className={styles.button}>
      Sair do modo draft
    </a>
  );
}