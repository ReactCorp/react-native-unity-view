package no.asmadsen.unity.view;

import android.content.ContextWrapper;

import com.unity3d.player.UnityPlayer;

public class NoKilledUnityPlayer extends UnityPlayer {

    public NoKilledUnityPlayer(ContextWrapper contextWrapper) {
        super(contextWrapper);
    }

    @Override
    protected void kill() {
        // NOP
    }
}
